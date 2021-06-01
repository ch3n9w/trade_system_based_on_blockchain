const Counter = require('../counterModel');


module.exports = {
    SequenceExist: async (sequenceName) => {
        var counter = Counter.find({ _id: sequenceName });
        if( counter )return true;
        return false;
    },

    InitValue: async (sequenceName) => {
        var counter = new Counter({
            _id: sequenceName,
            sequence_value: 0
        });
        await counter.save();
    },

    GetNextSequenceValue: async (sequenceName) => {
        var sequenceDocument = await Counter.findOneAndUpdate(
            {_id: sequenceName },
            {$inc:{sequence_value:1}},
            {"new":true}
        );
        return sequenceDocument.sequence_value;
    }



}
