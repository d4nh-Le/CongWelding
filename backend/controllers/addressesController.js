const Address = require('../models/userRelated/address');
const User = require('../models/roles/verified/user');

// Create a new address for a user
const createAddress = async (req, res) => {
  try {
    const { street, city, province, postalCode, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User with email ' + email + ' not found' });
    }
    const address = new Address({ street, city, province, postalCode, user: user._id });
    await address.save();
    res.status(201).json({ address });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create address' });
  }
};

// Get all addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json({ addresses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get addresses' });
  }
};

// Get an address by finding a unique document
const getAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: email });
    const address = await Address.findOne({ street, city, province, postalCode, user: user._id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ address });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get address' });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: email });
    const { street, city, province, postalCode } = req.body;
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id },
      { street, city, province, postalCode },
      { new: true }
    );
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ address });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update address' });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete address' });
  }
};

module.exports = { 
    createAddress, 
    getAddresses, 
    getAddress, 
    updateAddress, 
    deleteAddress 
};
