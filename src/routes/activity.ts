import Router from 'koa-router'
import ActivityControll from '../controller/activity'

const controll = new ActivityControll()
const router = new Router({
    prefix: '/activity'
})

router.post('/', controll.create)

router.get('/', controll.getList)

router.post('/update', controll.update)


export default router;