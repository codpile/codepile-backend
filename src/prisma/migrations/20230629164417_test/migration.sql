-- CreateTable
CREATE TABLE `User` (
    `userIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `imagePath` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `passwordResetToken` VARCHAR(255) NULL,
    `passwordResetExpires` DATETIME(3) NULL,

    UNIQUE INDEX `User_userIndex_key`(`userIndex`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `studentIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` VARCHAR(191) NOT NULL,
    `addedById` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `region` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `Student_studentIndex_key`(`studentIndex`),
    INDEX `Student_addedById_idx`(`addedById`),
    PRIMARY KEY (`studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `subjectIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` VARCHAR(191) NOT NULL,
    `subjectName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `Subject_subjectIndex_key`(`subjectIndex`),
    PRIMARY KEY (`subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prediction` (
    `predictionIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `predictionId` VARCHAR(191) NOT NULL,
    `predictedById` VARCHAR(255) NOT NULL,
    `studentId` VARCHAR(255) NOT NULL,
    `SubjectId` VARCHAR(255) NOT NULL,
    `previousExamMark` INTEGER NOT NULL,
    `predictedMark` INTEGER NOT NULL,
    `remark` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `Prediction_predictionIndex_key`(`predictionIndex`),
    INDEX `Prediction_predictedById_idx`(`predictedById`),
    INDEX `Prediction_studentId_idx`(`studentId`),
    INDEX `Prediction_SubjectId_idx`(`SubjectId`),
    PRIMARY KEY (`predictionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
