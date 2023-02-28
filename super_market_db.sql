-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 11:02 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `super_market_db`
--
CREATE DATABASE IF NOT EXISTS `super_market_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `super_market_db`;

-- --------------------------------------------------------

--
-- Table structure for table `cart_products`
--

CREATE TABLE `cart_products` (
  `cart_product_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 1,
  `total_price` float NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_products`
--

INSERT INTO `cart_products` (`cart_product_id`, `product_id`, `amount`, `total_price`, `cart_id`) VALUES
(258, 38, 5, 2, 98),
(259, 39, 5, 425, 98),
(278, 38, 1, 0.4, 99),
(280, 38, 1, 0.4, 100),
(281, 39, 1, 85, 100),
(284, 38, 1, 0.4, 99),
(285, 39, 1, 85, 99),
(286, 39, 1, 85, 99),
(287, 43, 2, 36, 100),
(288, 42, 6, 72, 100),
(289, 40, 4, 28, 100),
(290, 41, 1, 24, 100),
(291, 42, 1, 12, 102),
(292, 39, 1, 85, 102),
(293, 40, 1, 7, 102),
(294, 41, 1, 24, 102),
(295, 38, 1, 0.4, 103),
(296, 39, 1, 85, 103),
(297, 40, 1, 7, 103),
(298, 43, 1, 18, 103),
(299, 38, 1, 0.4, 104),
(300, 39, 1, 85, 104),
(301, 40, 1, 7, 104),
(306, 38, 5, 2, 104),
(307, 42, 2, 24, 104),
(308, 38, 1, 0.4, 106),
(309, 39, 1, 85, 106),
(310, 42, 1, 12, 106),
(311, 39, 1, 85, 107),
(312, 43, 1, 18, 107),
(313, 42, 1, 12, 107),
(314, 38, 1, 0.4, 107),
(315, 38, 2, 0.8, 107),
(322, 44, 1, 32, 108),
(323, 43, 1, 18, 108),
(324, 38, 55, 22, 108),
(325, 39, 1, 85, 109),
(326, 43, 1, 18, 109),
(327, 47, 5, 15, 109);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(1, 'Jerusalem'),
(2, 'Haifa'),
(3, 'Tel Aviv'),
(4, 'Baka El Garbiya'),
(5, 'Be\'er Sheva');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `order_price` int(11) NOT NULL DEFAULT 0,
  `city_id` int(11) NOT NULL,
  `street_name` varchar(60) NOT NULL,
  `arrival_date` date NOT NULL,
  `order_date` date NOT NULL DEFAULT current_timestamp(),
  `credit_card_digits` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `cart_id`, `order_price`, `city_id`, `street_name`, `arrival_date`, `order_date`, `credit_card_digits`) VALUES
(83, 2, 98, 427, 4, 'yaka rpo', '2023-02-27', '2023-02-26', 1234),
(84, 3, 100, 245, 4, 'kiryat yam', '2023-02-28', '2023-02-27', 1234),
(85, 3, 102, 128, 4, 'kiryat yam', '2023-02-28', '2023-02-27', 2134),
(86, 3, 103, 110, 4, 'kiryat yam', '2023-02-27', '2023-02-27', 2134),
(88, 2, 99, 171, 4, 'yaka rpo', '2023-02-28', '2023-02-28', 1234),
(89, 2, 106, 97, 4, 'yaka rpo', '2023-03-21', '2023-02-28', 1234),
(90, 3, 104, 118, 4, 'kiryat yam', '2023-03-29', '2023-02-28', 1234),
(91, 2, 107, 116, 4, 'yaka rpo', '2023-03-14', '2023-02-28', 1234),
(92, 2, 108, 72, 4, 'yaka rpo', '2023-03-29', '2023-02-28', 1234),
(93, 15, 109, 118, 3, 'yaka rpo', '2023-03-22', '2023-03-01', 1234);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_price` float NOT NULL,
  `image_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category_id`, `product_price`, `image_name`) VALUES
(38, 'Bell Pepper', 1, 0.4, '6b36f28a-56a3-4b7b-ac8f-11fad3bc0106.png'),
(39, 'Steak', 3, 85, 'bcb17710-e264-4b39-9c8a-0b08fdb7a2ba.png'),
(40, 'Sprite', 4, 7, 'aad55234-00da-4956-983c-27f9ba418555.jpg'),
(41, 'Watermelon', 1, 24, '3499069f-9874-4cf0-abdf-23b57a00aeea.jpg'),
(42, 'Yogurt', 2, 12, '9813dcfb-1ad4-4398-9aa1-912f9dcd97d5.jpg'),
(43, 'Buckwheat', 5, 18, '550dc8eb-f318-4eb1-9a7f-9dcd7c212d3c.jpg'),
(44, 'Salmon', 3, 32, '5c70a7eb-8f97-4aea-b9d7-42015d583870.jpg'),
(46, 'Lettuce', 1, 11, 'fff349ac-bcac-4942-aff6-1240cdf50b9d.jpg'),
(47, 'Potato', 1, 3, 'e11acfbe-3ff2-414a-9692-fcc774403b75.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_id`, `category_name`) VALUES
(1, 'Fruits & Vegetables'),
(2, 'Dairy & Eggs'),
(3, 'Meat & Fish'),
(4, 'Snacks & Beverages'),
(5, 'Cooking & Baking');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_carts`
--

CREATE TABLE `shopping_carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shopping_carts`
--

INSERT INTO `shopping_carts` (`cart_id`, `user_id`, `creation_date`) VALUES
(98, 2, '2023-02-26'),
(99, 2, '2023-02-26'),
(100, 3, '2023-02-27'),
(102, 3, '2023-02-27'),
(103, 3, '2023-02-27'),
(104, 3, '2023-02-27'),
(106, 2, '2023-02-28'),
(107, 2, '2023-02-28'),
(108, 2, '2023-02-28'),
(109, 15, '2023-03-01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `id_card` int(11) NOT NULL,
  `password` varchar(60) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `street_name` varchar(60) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `user_email`, `id_card`, `password`, `city_id`, `street_name`, `is_admin`) VALUES
(1, 'yuval', 'barkai', 'yuval120222@gmail.com', 123456789, '123', 1, 'Korchak', 1),
(2, 'John', 'Bryce', 'johnbryce@johnbryce.com', 516187458, '1212', 4, 'yaka rpo', 0),
(3, 'jeff', 'beck', 'jeff@gmail.com', 12301232, '321', 4, 'kiryat yam', 0),
(7, 'asd', 'asd', 'asdads@aasd.com', 2132, '123', 2, 'asd', 0),
(8, 'joshwa', 'fineman', 'asdasd@gmail.com', 2147483647, '1234', 2, 'zzz', 0),
(9, 'george', 'wash', 'george@gmail.com', 12321, '444', 4, 'asdasd', 0),
(15, 'test', 'eee', 'test@gmail.com', 123213, '222', 3, 'yaka rpo', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`cart_product_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `card_id` (`cart_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_name` (`product_name`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `id_card` (`id_card`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `city_id` (`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `cart_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shopping_carts`
--
ALTER TABLE `shopping_carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_products`
--
ALTER TABLE `cart_products`
  ADD CONSTRAINT `cart_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_products_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`cart_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`cart_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
