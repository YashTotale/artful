// DB Imports
import { Sequelize, DataTypes, Model } from "sequelize-cockroachdb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Next Imports
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const sequelize = new Sequelize(process.env.DATABASE_URL ?? "", {
  dialectOptions: {
    application_name: "artful-app",
  },
});

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
}

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.sync({
  force: true,
})
  .then(function () {
    return User.bulkCreate([
      {
        id: "1",
        username: "Museum of Modern Art",
        email: "information@moma.org",
        password: "password123",
      },
    ]);
  })
  .catch(function (err) {
    console.error("Error:", err.message);
    process.exit(1);
  });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = JSON.parse(req.body);

  //find a user by their email
  const user = (await User.findOne({
    where: { email },
  })) as unknown as UserData;

  //if user email is found, compare password with bcrypt
  if (user) {
    const isSame = password === user.password; // await bcrypt.compare(password, user.password);

    //if password is the same
    //generate token with the user's id and the secretKey in the env file

    if (isSame) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey ?? "", {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      //if password matches wit the one in the database
      //go ahead and generate a cookie for the user
      // @ts-ignore
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send user data
      return res.status(201).send(user);
    } else {
      return res.status(401).send("Authentication failed");
    }
  } else {
    return res.status(401).send("Authentication failed");
  }
});

export default apiRoute;
