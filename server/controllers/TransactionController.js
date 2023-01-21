 import TransactionModel from "../models/TransactionModel.js";


export const index =  async (req, res) => {
    const transaction = await TransactionModel.find({user_id: req.user._id}).sort({createdAt:-1})

    const demo = await(TransactionModel.aggregate([
        {
            $match: {user_id: req.user._id},
        },
        {
             $group: {
                _id: { $month: "$date" },
                transactions: {
                $push: {
                    amount: "$amount",
                    description: "$description",
                    date: "$date",
                    type: "$type",
                    _id: "$_id",
                },
                },
                totalExpenses: { $sum: "$amount" },
      },
        }
    ]))
    res.json({data : demo})

 }


export const create = async (req, res) => { 
    const {amount , description, date, category_id} = req.body
    const transaction = new TransactionModel({
        amount,
        description,
        date,
        user_id: req.user._id,
        category_id
    })
    await transaction.save()
    res.json("Success")
}

export const deleteTransaction =  async (req, res) => {
    await TransactionModel.findOneAndDelete({_id : req.params.id})
    res.json({message: "Success"})
}

export const update =  async (req,res) => {
    await TransactionModel.updateOne({_id: req.params.id}, {$set : req.body})
    res.json({message:"success"})
}
