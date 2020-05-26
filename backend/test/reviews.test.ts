import 'mocha'
import sinon, { SinonStub, stub, assert, spy } from 'sinon'

import mocks from './mock'
import Reviews from '../src/models/Reviews'
import {
  getReviewById,
  searchReviewsByFoodMenu,
  editingReview,
} from '../src/controllers/ReviewsController'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import FoodDict from '../src/FoodDict'

describe('Reviews', async () => {
  const res: Partial<Response> = {
    send: stub().returns({ status: spy() }),
    sendStatus: spy(),
  }

  it('test get by review id', async () => {
    const reviewID = 1
    const req: Partial<Request> = {
      params: { id: reviewID.toString() },
    }

    const expectedResult = mocks[reviewID] as Reviews

    stub(Reviews, 'findOne').resolves(expectedResult)
    await getReviewById(req as Request, res as Response)
    assert.calledWith(Reviews.findOne as SinonStub, {
      where: { reviewID: req.params.id },
    })
    assert.calledWith(res.send as SinonStub, expectedResult)
    ;(Reviews.findOne as SinonStub).restore()
  })

  it('test search by food menu', async () => {
    const query = 'เนื้อย่าง'
    const req: Partial<Request> = {
      query: { query },
    }

    const resolves = [mocks[2]] as [Reviews]
    const expectedResult = [
      {
        reviewID: 3,
        review:
          'ครัววงเดือน  \n' +
          '\n' +
          'หิวดึกๆ ตระเวนหาร้านทาน มาเจอร้านริมถนนพุทธมณฑลสาย 1 หน้าปากซอยพุทธมณฑลสาย 1 ซอย 10ครับ ร้านวงเดือน ขายทั้งอาหารไทยทั่วไป ทะเลเผา รวมถึงเมนูของร้านส้มตำทั้งหมดด้วย เมนูเยอะเลือกไม่ถูกเลย \n' +
          '\n' +
          '\n' +
          '1. ยำมะเขือเปราะ 100 บาท จัดจ้านมากๆ\n' +
          ' \n' +
          '2. กบทอดกระเทียม 100 บาท กบตัวเล็กไปหน่อยครับ ทอดมากรอบนอกนุ่มในดีครับ อร่อยๆๆ\n' +
          '\n' +
          '3. ลาบปลาช่อน 100 บาท ทำมาเป็นชิ้นๆทอดมาแล้ว ทานง่าย รสชาติลาบ หอมข้าวคั่ว ลาบมาอร่อยเลยครับ\n' +
          '\n' +
          '4. <keyword>เนื้อย่าง</keyword> 100 บาท เมนูนี้ตกม้าตาย เนื้อไม่ได้หมักอะไรเลย มาจืดๆ เพราะปกติผมทานแบบไม่จิ้มน้ำจิ้มเลย พอเจอแบบนึ้เลยผิดหวังครับ\n' +
          '\n' +
          '5. เฉาก๊วยชากังราว 25 บาท\n' +
          '\n' +
          '*** ร้านนี้ไม่มีข้าวเหนียวขายนะครับ เพราะเค้าเพิ่งเอาไลน์ส้มตำ จิ้มจุ่มมาขายเมื่อ 2-3 เดือนมานี้เอง ***\n' +
          '\n' +
          'เวลาเปิดร้าน : 10:00 - 23:00\n' +
          'โทร : 092 345 4318\n',
      },
    ] as [Reviews]

    stub(Reviews, 'findAll').resolves(resolves)
    stub(FoodDict.getInstance(), 'validateFoodMenu').resolves(true)
    await searchReviewsByFoodMenu(req as Request, res as Response)
    assert.calledWith(Reviews.findAll as SinonStub, {
      where: { review: { [Op.like]: `%${query}%` } },
    })
    assert.calledWith(res.send as SinonStub, expectedResult)
    ;(Reviews.findAll as SinonStub).restore()
    ;(FoodDict.getInstance().validateFoodMenu as SinonStub).restore()
  })

  it('test search by food menu not in food dict', async () => {
    const query = 'ฮันนี่โทส'
    const req: Partial<Request> = {
      query: { query },
    }

    const resolves = [mocks[7]] as [Reviews]

    stub(Reviews, 'findAll').resolves(resolves)
    stub(FoodDict.getInstance(), 'validateFoodMenu').returns(false)
    await searchReviewsByFoodMenu(req as Request, res as Response)
    assert.notCalled(Reviews.findAll as SinonStub)
    assert.calledWith(res.send as SinonStub, null)
    ;(Reviews.findAll as SinonStub).restore()
    ;(FoodDict.getInstance().validateFoodMenu as SinonStub).restore()
  })

  it('should edit a review', async () => {
    const reviewID = 1
    const req: Partial<Request> = {
      params: { id: reviewID.toString() },
      body: { review: 'new review to edittt.' },
    }

    stub(Reviews, 'update')
    await editingReview(req as Request, res as Response)
    assert.calledWith(
      Reviews.update as SinonStub,
      { review: req.body.review },
      { where: { reviewID: req.params.id } }
    )
    assert.calledWith(res.sendStatus as SinonStub, 200)
    ;(Reviews.update as SinonStub).restore()
  })
})
