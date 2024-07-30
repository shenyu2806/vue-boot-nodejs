/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50096 (5.0.96-community)
 Source Host           : localhost:3306
 Source Schema         : back_system

 Target Server Type    : MySQL
 Target Server Version : 50096 (5.0.96-community)
 File Encoding         : 65001

 Date: 29/07/2024 23:48:23
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `set_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `set_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, 'swiper1', '', NULL);
INSERT INTO `setting` VALUES (2, 'swiper2', NULL, NULL);
INSERT INTO `setting` VALUES (3, 'swiper3', NULL, NULL);
INSERT INTO `setting` VALUES (4, 'swiper4', '', NULL);
INSERT INTO `setting` VALUES (5, 'swiper5', NULL, NULL);
INSERT INTO `setting` VALUES (6, 'swiper6', NULL, NULL);
INSERT INTO `setting` VALUES (7, '公司名称', '', NULL);
INSERT INTO `setting` VALUES (8, '公司介绍', '', NULL);
INSERT INTO `setting` VALUES (9, '公司架构', NULL, NULL);
INSERT INTO `setting` VALUES (10, '公司战略', NULL, NULL);
INSERT INTO `setting` VALUES (11, '公司现任高层', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
