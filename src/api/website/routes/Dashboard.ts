import AbstractRoutes from '../../Server/AbstractRoutes'
import { CustomRequest } from '../index'

export default class Dashboard extends AbstractRoutes {
  async register () {
    this.isProtected = true;

    this.router.get('/dashboard', function (req: CustomRequest, res) {
        res.render('dashboard', {
            user: req.signedCookies['session']
        })
    })
  }
}