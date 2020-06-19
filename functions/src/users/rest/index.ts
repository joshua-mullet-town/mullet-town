import routers from '../../utils/routers'

const restRouter = routers.whitelisted

import { post } from './post'
restRouter.post('', post)

export default restRouter