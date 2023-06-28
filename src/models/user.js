const bcrypt = require("bcrypt");
const { randomBytes, createHash } = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {};

User.create = async (userObj) => {
  userObj.password = await bcrypt.hash(userObj.password, 10);

  return await prisma.user.create({
    data: userObj,
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
    },
  });
};

User.comparePasswords = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

User.findUserById = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      userId: { equals: userId },
    },
  });
};

User.findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
  });
};

User.findUsers = async () => {
  return await prisma.user.findMany();
};

User.findUsersExceptMe = async (userId) => {
  return await prisma.user.findMany({
    where: {
      userId: { not: userId },
    },
  });
};

User.updatePassword = async (userId, newPassword) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      password: newHashedPassword,
    },
  });
};

User.findByToken = async (token) => {
  return await prisma.user.findFirst({
    where: {
      passwordResetToken: { equals: token },
    },
  });
};

User.createPasswordResetToken = () => {
  const resetToken = randomBytes(32).toString("hex");
  return resetToken;
};

User.savePasswordResetToken = async (userId, resetToken) => {
  const hashedToken = createHash("sha256").update(resetToken).digest("hex");

  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      passwordResetToken: hashedToken,
      passwordResetExpires: new Date(Date.now() + 1000 * 60 * 20),
    },
  });
};

User.updatePasswordResetToken = async (userObj) => {
  return await prisma.user.update({
    where: {
      userId: userObj.userId,
    },
    data: {
      passwordResetToken: userObj.passwordResetToken,
      passwordResetExpires: userObj.passwordResetExpires,
    },
  });
};

User.passwordResetExpired = (expiryDate) => {
  const isExpired = new Date(expiryDate) < new Date(Date.now());
  return isExpired;
};

User.updateProfile = async (userId, userName, email) => {
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      userName: userName,
      email: email,
    },
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
      imageUrl: true,
    },
  });
};

User.updatePhoto = async (userId, imageName, imageUrl) => {
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      imageName: imageName,
      imageUrl: imageUrl,
    },
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
      imageUrl: true,
    },
  });
};

// User.findById = async (userId) => {
//   return await prisma.user.findMany({
//     where: {
//       // userId: userId,
//       sender: {
//         senderId: userId,
//       },
//     },
//     include: {
//       sender: true,
//       // recipient: true,
//     },
//   });
// };

// User.findById = async (userId) => {
//   return await prisma.user.findMany({
//     where: {
//       userId: {
//         not: userId,
//       },
//     },
//     select: {
//       // userIndex: true,
//       // userId: true,
//       // email: true,
//       // userName: true,
//       // imageUrl: true,
//       sender: {
//         where: {
//           recipientId: userId,
//         },
//         distinct: ["recipientId"],
//         select: {
//           recipientId: true,
//         },
//       },
//       recipient: {
//         where: {
//           recipientId: userId,
//         },
//         distinct: ["senderId"],
//         select: {
//           senderId: true,
//         },
//       },
//     },
//   });
// };

User.findById = async (userId) => {
  return await prisma.user.findMany({
    where: {
      userId: {
        not: userId,
      },
    },
    select: {
      sender: {
        where: {
          NOT: [{ senderId: userId }, { recipientId: userId }],
        },
      },
      recipient: {
        where: {
          NOT: [{ senderId: userId }, { recipientId: userId }],
        },
      },
    },
  });
};
module.exports = User;
