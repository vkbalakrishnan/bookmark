-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 08, 2012 at 11:43 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookmark`
--

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE IF NOT EXISTS `sites` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `website` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `website`, `tag`) VALUES
(3, 'gmail.com', 'mail'),
(4, 'stackoverflow.com', 'programming, search'),
(5, 'facebook.com', 'social'),
(6, 'backbonejs.org', 'programming, reference'),
(7, 'jquery.com', 'programming, javascript'),
(8, 'underscore.js', 'programming, javascript'),
(15, 'zurb foundation', 'programming, markup'),
(16, 'twitter-bootstrap', 'markup, programming'),
(17, 'localhost', 'local, server'),
(18, 'yahool.com', 'search, second'),
(19, 'aol', 'media, whatever'),
(20, 'techcrunch', 'blog, technology'),
(21, 'engadget', 'blog, gadget'),
(22, 'google', 'search, gaint'),
(24, 'twitter', 'social'),
(25, 'wordpress', 'blog, cms'),
(26, 'joomla', 'cms'),
(27, 'drupal', 'cms, open source'),
(29, 'times', 'newspaper');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
