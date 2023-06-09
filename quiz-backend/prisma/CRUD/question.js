const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Créer une nouvelle question
async function createQuestion(moduleId, data) {
  try {
    return await prisma.question.create({
      data: {
        ...data,
        module: { connect: { id: moduleId } },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Obtenir une question par ID
async function getQuestionById(questionId) {
  try {
    return await prisma.question.findUnique({ where: { id: questionId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Mettre à jour une question
async function updateQuestion(questionId, data) {
  try {
    return await prisma.question.update({ where: { id: questionId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Supprimer une question
async function deleteQuestion(questionId) {
  try {
    return await prisma.question.delete({ where: { id: questionId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer un ensemble de questions selon le module et le niveau
async function getQuestionsByModuleAndLevel(moduleTitle, questionLevel) {
  try {
    const module = await prisma.module.findUnique({
      where: { module_title: moduleTitle },
    });

    if (!module) {
      throw new Error("Module not found");
    }

    return await prisma.question.findMany({
      where: { question_level: questionLevel, module_id: module.id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByModuleAndLevel,
};
