import Router from 'koa-router'
import VisitControll from '../controller/visit'

const visitCntl = new VisitControll()
const router = new Router({
    prefix: '/visit'
})

router.get('/', visitCntl.getList)

router.get('/user', ctx => visitCntl.update(ctx, 'new'))

router.get('/returned', ctx => visitCntl.update(ctx, 'old'))


export default router;