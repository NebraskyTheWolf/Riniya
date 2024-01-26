import AbstractRoutes from '../../Server/AbstractRoutes'
import { CustomRequest } from '../index'

export default class Index extends AbstractRoutes {
  async register () {
    this.router.get('/', function (req, res) {
        res.render('index', {
            title: 'RINIYA'
        })
    });

    this.router.get('/commands', function (req: CustomRequest, res) {
        res.render('commands', {
          title: 'RINIYA - Commands',
          isLogged: (req.internal !== null)
        });
    });
  }

}
