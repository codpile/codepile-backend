const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Student = {};
const student = prisma.student;

Student.create = async (studentObj) => {
  return await student.create({
    data: studentObj,
    select: {
      studentIndex: true,
      studentId: true,
      firstName: true,
      lastName: true,
      gender: true,
      age: true,
    },
  });
};

Student.findById = async (studentId) => {
  return await student.findFirst({
    where: {
      studentId: { equals: studentId },
    },
  });
};

Student.findByAddedBy = async (addedById) => {
  return await student.findMany({
    where: {
      addedById: { equals: addedById },
    },
  });
};

Student.findAll = async () => {
  return await student.findMany({});
};

Student.update = async (studentId, studentObj) => {
  return await student.update({
    where: {
      studentId: studentId,
    },
    data: studentObj,
    select: {
      studentIndex: true,
      studentId: true,
      firstName: true,
      lastName: true,
      gender: true,
      age: true,
    },
  });
};

Student.delete = async (studentId) => {
  return await student.delete({
    where: {
      studentId: studentId,
    },
  });
};

Student.deleteByAddedBy = async (addedById) => {
  return await student.delete({
    where: {
      addedById: { equals: addedById },
    },
  });
};

module.exports = Student;
