import Router from 'koa-router'
import ActivityControll from '../controller/activity'

const activityCntl = new ActivityControll()
const router = new Router({
    prefix: '/activity'
})

router.post('/', activityCntl.create)

router.get('/', activityCntl.getList)

router.post('/update', activityCntl.update)

router.delete('/delete', activityCntl.delete)

router.get('/preview/:id', activityCntl.preview)

router.get('/publish', activityCntl.publish)

export default router;