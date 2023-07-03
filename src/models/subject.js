const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Subject = {};
const subject = prisma.subject;

Subject.create = async (subjectName) => {
  return await subject.create({
    data: { subjectName: subjectName },
    select: {
      subjectIndex: true,
      subjectId: true,
      subjectName: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

Subject.findById = async (subjectId) => {
  return await subject.findFirst({
    where: {
      subjectId: { equals: subjectId },
    },
  });
};

Subject.findAll = async () => {
  return await subject.findMany({});
};

module.exports = Subject;
