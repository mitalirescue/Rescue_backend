import express from 'express'
import {inquiryFunction} from '../controller/inquiry.controller.js'

const router = express.Router()


router.post('/',inquiryFunction)

export default router;