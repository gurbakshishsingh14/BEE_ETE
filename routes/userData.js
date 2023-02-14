const express = require("express");
const transactions = require("../models/transactionSchema");
const router = express.Router();
const user = require("../models/userSchema");

router.post("/add", async (req, res) => {
  const {
    firstName,
    lastName,
    Phone,
    DOB,
    gender,
    Address,
    name,
    email,
    employment,
    accountType,
    amount,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !Phone ||
    !DOB ||
    !gender ||
    !Address ||
    !name ||
    !email ||
    !employment ||
    !accountType ||
    !amount
  ) {
    return res.status(400).json({ msg: "Please fill all the details" });
  }
  const newUser = new user({
    firstName,
    lastName,
    Phone,
    DOB,
    gender,
    Address,
    name,
    email,
    employment,
    accountType,
    amount,
  });

  await newUser.save();
});

router.get("/customers", async (req, res) => {
  try {
    const User = await user.find();
    return res.send(User);
  } catch (e) {
    return res.status(500).json();
  }
});

router.get("/customers/:id", async (req, res) => {
  const data = await user.findById(req.params.id);
  if (data) {
    return res.send(data);
  }
});

router.put("/customer/money", async (req, res) => {
  try {
    const { id, count, id2 } = req.body;
    const data = await user.findById(id);
    const data2 = await user.findById(id2);
    data2.amount = count + data2.amount;
    data.amount = data.amount - count;
    data.save();
    data2.save();
    return res.send("updated successfull");
  } catch (e) {
    console.log(e.message);
    return res.error("Kuch hogya");
  }
});


router.post("/transactions", async (req, res) => {
  try {
    const { id, count, id2 } = req.body;
    const data = await user.findById(id);
    const data2 = await user.findById(id2);
    const newTrans = new transactions({
      userOne: data.name,
      userTwo: data2.name,
      amount: count
    })

    await newTrans.save();
  } catch (e) {
    console.log(e);
  }
})


router.get("/gettransactions", async (req, res) => {
  try {
    const data = await transactions.find();
    return res.send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json();
  }
})


module.exports = router;
