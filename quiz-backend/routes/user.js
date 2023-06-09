const modelUser = require("../prisma/CRUD/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  // res.status(200).json({ msg: "success" });
  try {
    // Récupérer tous les utilisateurs depuis la base de données avec Prisma
    const users = await prisma.user.findMany();

    // Envoyer la liste des utilisateurs en tant que réponse JSON
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    // Récupérer tous les utilisateurs depuis la base de données avec Prisma
    const user = await modelUser.createUser({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    console.log(user);

    // Envoyer la liste des utilisateurs en tant que réponse JSON
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    // Comparer email et password et renvoyer un token
    const compare = await modelUser.comparePasswords(email, password);
    function generateToken(user) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(payload, "your-secret-key", { expiresIn: "1h" });
      return token;
    }
    if (compare === true) {
      const user = await modelUser.findUserByEmail(email);
      if (user) {
        const { id, email, firstname, lastname } = user;

        // Renvoyer les données de l'utilisateur (sans le mot de passe)
        res.json({
          token: generateToken(user),
          user: id,
          email: email,
          firstname: firstname,
          lastname: lastname,
        });
      } else {
        res.status(404).json({ message: "Utilisateur introuvable" });
      }
    } else {
      res.status(500).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de login.", error });
  }
});

// userRouter.post("/login", async (req, res) => {
//   try {
//     const { password, email } = req.body;
//     //comparer email et password si c'est bon et renvoyer un token
//     const compare = await modelUser.comparePasswords(email, password);
//     const userID = await modelUser.findUserByEmail(email);
//     console.log(userID);
//     if (compare === true) {
//       res.json({ token: email, userID: userID });
//     } else {
//       res.status(500).json({ message: "Email ou mot de passe incorrect" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Erreur de login.", error });
//   }
// });

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Récupérer tous les utilisateurs depuis la base de données avec Prisma
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });

    // Envoyer la liste des utilisateurs en tant que réponse JSON
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
});

module.exports = userRouter;
