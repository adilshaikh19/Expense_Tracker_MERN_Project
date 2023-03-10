import UserModel from "../models/UserModel.js";

export const destroy = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id
  );

  const user = await UserModel.updateOne(
    { _id: req.user.id },
    { $set: { categories: newCategories } }
  );
  res.json({ user });
};


export const create = async (req, res) => {
  const { label, icon } = req.body;
  const response = await UserModel.updateOne(
    { _id: req.user.id },
    { $set: { categories: [...req.user.categories, { label, icon }] } }
  );

  res.json({ response });
};