const axios = require("axios");
const bcrypt = require("bcryptjs");

class SCMUser {
  constructor({ userId, role, email, contact, address, name, password }) {
    this.userId = userId;
    this.name = name;
    this.role = role;
    this.email = email;
    this.contact = contact;
    this.address = address;
    this.password = password;
  }

  static async get({ role, ...args }) {
    switch (role.toUpperCase()) {
      case "GROWER":
        const growerUrl = args.email
          ? `${process.env.BLOCKCHAIN_URL}/queries/GetGrowerByEmail?email=${args.email}`
          : `${process.env.BLOCKCHAIN_URL}/Grower`;
        return getSCMUser({ url: growerUrl });
      case "FARMINSPECTOR":
        const fiUrl = args.email
          ? `${process.env.BLOCKCHAIN_URL}/queries/GetFarmInspectorByEmail?email=${args.email}`
          : `${process.env.BLOCKCHAIN_URL}/FarmInspector`;
        return getSCMUser({ url: fiUrl });
      case "SHIPPER":
        const shipperUrl = args.email
          ? `${process.env.BLOCKCHAIN_URL}/queries/GetShipperByEmail?email=${args.email}`
          : `${process.env.BLOCKCHAIN_URL}/Shipper`;
        return getSCMUser({ url: shipperUrl });
      case "PROCESSOR":
        const processorUrl = args.email
          ? `${process.env.BLOCKCHAIN_URL}/queries/GetProcessorByEmail?email=${args.email}`
          : `${process.env.BLOCKCHAIN_URL}/Processor`;
        return getSCMUser({ url: processorUrl });
    }
  }

  static async getById({ role, id }) {
    switch (role.toUpperCase()) {
      case "GROWER":
        const growerUrl = `${process.env.BLOCKCHAIN_URL}/Grower/${id}`;
        return getSCMUser({ url: growerUrl });
      case "FARMINSPECTOR":
        const fiUrl = `${process.env.BLOCKCHAIN_URL}/FarmInspector/${id}`;
        return getSCMUser({ url: fiUrl });
      case "SHIPPER":
        const shipperUrl = `${process.env.BLOCKCHAIN_URL}/Shipper/${id}`;
        return getSCMUser({ url: shipperUrl });
      case "PROCESSOR":
        const processorUrl = `${process.env.BLOCKCHAIN_URL}/Processor/${id}`;
        return getSCMUser({ url: processorUrl });
    }
  }

  async set() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    switch (this.role.toUpperCase()) {
      case "GROWER":
        let growerUrl = `${process.env.BLOCKCHAIN_URL}/Grower`;
        return createSCMUser({
          className: "org.coffeescm.Grower",
          data: this,
          url: growerUrl,
        });
      case "FARMINSPECTOR":
        let fiUrl = `${process.env.BLOCKCHAIN_URL}/FarmInspector`;
        return createSCMUser({
          className: "org.coffeescm.FarmInspector",
          data: this,
          url: fiUrl,
        });
      case "SHIPPER":
        let shipperUrl = `${process.env.BLOCKCHAIN_URL}/Shipper`;
        return createSCMUser({
          className: "org.coffeescm.Shipper",
          data: this,
          url: shipperUrl,
        });
      case "PROCESSOR":
        let processorUrl = `${process.env.BLOCKCHAIN_URL}/Processor`;
        return createSCMUser({
          className: "org.coffeescm.Processor",
          data: this,
          url: processorUrl,
        });
    }
  }
}

async function createSCMUser({ className, data, url }) {
  try {
    const result = await axios({
      method: "POST",
      url,
      data: {
        $class: className,
        ...data,
        address: { $class: "org.coffeescm.Address", ...data.address },
      },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function getSCMUser({ url }) {
  try {
    const result = await axios({
      method: "GET",
      url,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
}

module.exports = SCMUser;

/*
Blockchain Schema
[
  {
    "$class": "org.coffeescm.Grower",
    "role": "GROWER",
    "userId": "string",
    "name": "string",
    "email": "string",
    "contact": 0,
    "address": {
      "$class": "org.coffeescm.Address",
      "country": "string",
      "latitude": 0,
      "longitude": 0,
      "id": "string"
    }
  }
]
*/
