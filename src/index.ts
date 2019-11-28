const express = require('express')
const bodyParse = require('body-parser')
import http from 'http'
import 'reflect-metadata'
import { createConnection, getConnection, getManager } from 'typeorm'
import { WorkItem } from './Entity/workItem';
const passport = require('passport')

createConnection()

const app = express()
const router = express.Router()

app.get('/', (req: any, res: any) => {
    // res.send('Hello World')
    res.json({ promote: 'hello express' })
})

router.get('', (req: any, res: any, next: any) => {
    const workItemRepository = getManager().getRepository(WorkItem)
    try {
        const workItems = workItemRepository.find({
            // order: {
            //     createdAt: 'desc'
            // }
        })
        res.json(workItems)
    } catch (error) {
        next(error)
    }
})

router.post('', (req: any, res: any, next: any) => {
    const workItem = new WorkItem()
    workItem.text = req.body.text
    const workItemRepository = getManager().getRepository(WorkItem)
    try {
        res.json(workItemRepository.save(workItem))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', (req: any, res: any, next: any) => {
    const body = req.body
    const workItemRepository = getManager().getRepository(WorkItem)
    try {
        workItemRepository.update(req.params.id, {
            isChecked: body.isChecked
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', (req: any, res: any, next: any) => {
    const body = req.body
    const workItemRepository = getConnection().manager.getRepository(WorkItem)
    try {
        workItemRepository.delete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
        });
    }
));

app.use('/work-items', router)

app.use(bodyParse.json())

const server = http.createServer(app)

app.listen(3001)
