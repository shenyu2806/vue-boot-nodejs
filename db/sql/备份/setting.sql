/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726 (5.7.26)
 Source Host           : localhost:3306
 Source Schema         : back_system

 Target Server Type    : MySQL
 Target Server Version : 50726 (5.7.26)
 File Encoding         : 65001

 Date: 09/08/2024 22:05:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `set_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `set_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '值',
  `set_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文本',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, 'swiper1', '', NULL);
INSERT INTO `setting` VALUES (2, 'swiper2', '', NULL);
INSERT INTO `setting` VALUES (3, 'swiper3', '', NULL);
INSERT INTO `setting` VALUES (4, 'swiper4', '', NULL);
INSERT INTO `setting` VALUES (5, 'swiper5', '', NULL);
INSERT INTO `setting` VALUES (6, 'swiper6', '', NULL);
INSERT INTO `setting` VALUES (7, '公司名称', '', '');
INSERT INTO `setting` VALUES (8, '公司介绍', '', '');
INSERT INTO `setting` VALUES (9, '公司架构', NULL, '');
INSERT INTO `setting` VALUES (10, '公司战略', NULL, '');
INSERT INTO `setting` VALUES (11, '公司现任高层', NULL, '');
INSERT INTO `setting` VALUES (12, '部门设置', '[]', '');
INSERT INTO `setting` VALUES (13, '允许注册', '0', NULL);
INSERT INTO `setting` VALUES (14, '产品类别', '[]', '');

SET FOREIGN_KEY_CHECKS = 1;
