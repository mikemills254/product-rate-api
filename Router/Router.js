import express from 'express';
import * as jumia from '../Controller/Scrapper/JumiaScrapper.js'
import * as auth from '../Controller/Auth/authcontroller.js'

const router = express.Router();

router.route('/register').post(auth.register)

router.route('/login').post(auth.login)

router.route('/top_deals').get(jumia.topDeals)

router.route('/new_laptops').get(jumia.newLaptops)

router.route('/refurb_laptops').get(jumia.refurbComputer)

router.route('/accessories').get(jumia.compAccessories)

router.route('/printers').get(jumia.printers)

export default router;