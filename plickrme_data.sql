-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 23, 2015 at 08:11 AM
-- Server version: 5.6.22
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `plickrme_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `grab`
--

CREATE TABLE IF NOT EXISTS `grab` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `datatype` enum('img','txt','url') NOT NULL,
  `title` varchar(80) NOT NULL,
  `payload` text NOT NULL,
  `device_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gid`),
  KEY `uid` (`uid`),
  KEY `device_id` (`device_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `grab`
--

INSERT INTO `grab` (`gid`, `uid`, `datatype`, `title`, `payload`, `device_id`, `created_on`) VALUES
(39, 4, 'txt', 'The effect of this method call is that the todo list is rendered into a DOM El..', 'The effect of this method call is that the todo list is rendered into a DOM Element called "todoItems"', 1, '2015-02-23 13:28:05'),
(40, 4, 'txt', 'The effect of this method call is that the todo list is rendered into a DOM El..', 'The effect of this method call is that the todo list is rendered into a DOM Element called "todoItems"', 1, '2015-02-23 13:30:10'),
(41, 4, 'txt', 'Note that all of these commands used in this sample are asynchronous and as su..', 'Note that all of these commands used in this sample are asynchronous and as such the data is not returned from the transaction or the executeSql call. The results are passed through to the success callback.', 1, '2015-02-23 13:30:24'),
(42, 4, 'txt', 'Step 4a. Rendering data from a table  Once the data has been fetched from the ..', 'Step 4a. Rendering data from a table  Once the data has been fetched from the table, the loadTodoItems method will be called.  The onSuccess callback takes two parameters. The first being the transaction of the query and the second being the result set. It is fairly simple to iterate across the data:', 1, '2015-02-23 13:32:35'),
(43, 4, 'txt', 'Step 3. Adding data to a table  We are building a todo list manager so it is p..', 'Step 3. Adding data to a table  We are building a todo list manager so it is pretty important that we are able to add todo items in to the database.  A transaction is created, inside the transaction an INSERT into the todo table is performed.  executeSql takes several parameters, the SQL to execute and the parameters values to bind the query.', 1, '2015-02-23 13:42:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `gender` enum('m','f') NOT NULL,
  `country` varchar(10) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `fullname`, `email`, `password`, `mobile`, `gender`, `country`, `created_on`) VALUES
(4, 'Rafique Mohammed', 'ar.rafiq@live.com', 'mohammed', '8976288706', '', 'India', '2015-02-17 09:47:20'),
(5, 'Ronak Rathod', 'ronakrathod@hotmail.com', '123456', '9920727243', '', 'India', '2015-02-17 10:43:50'),
(6, 'Ronak Rathod', 'ronak@growthwell.com', '123456', '9920727342', '', 'India', '2015-02-17 12:16:17'),
(7, 'ROnak Rathod', 'ronak@gmail.com', '123456', '9920727344', '', 'India', '2015-02-17 12:20:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_device`
--

CREATE TABLE IF NOT EXISTS `user_device` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `device_type` enum('Android','Chrome','Firefox','Firefox') NOT NULL,
  `notify_id` varchar(300) NOT NULL,
  `device_name` varchar(50) NOT NULL,
  `device_display_name` varchar(50) NOT NULL,
  `enabled` enum('0','1') NOT NULL DEFAULT '1' COMMENT '1=enable , 0=disable',
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`did`),
  KEY `uid` (`uid`),
  KEY `notify_id` (`notify_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user_device`
--

INSERT INTO `user_device` (`did`, `uid`, `device_type`, `notify_id`, `device_name`, `device_display_name`, `enabled`, `added_on`) VALUES
(1, 4, 'Chrome', 'AEIEHDGSYUSKDFJFJFJFKFMFJJF', 'Chrome For Windows', 'My Home PC', '1', '2015-02-18 07:00:21');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grab`
--
ALTER TABLE `grab`
  ADD CONSTRAINT `grab_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `user_device` (`did`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
