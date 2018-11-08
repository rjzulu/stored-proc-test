import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import { People } from '../models';
import { PeopleRepository } from '../repositories';
import { AnyObject } from 'loopback-datasource-juggler';


const DataSource = require('loopback-datasource-juggler').DataSource;

const db = new DataSource({
  connector: require('loopback-connector-mssql'),
  host: '127.0.0.1',
  port: 1433,
  database: 'AM',
  password: 'pokemon',
  user: 'titodesu',
});

export class PeopleController {

  constructor(
    @repository(PeopleRepository)
    public peopleRepository: PeopleRepository,
  ) { }

  // @post('/people', {
  //   responses: {
  //     '200': {
  //       description: 'People model instance',
  //       content: { 'application/json': { 'x-ts-type': People } },
  //     },
  //   },
  // })
  // async create(@requestBody() people: People): Promise<People> {
  //   return await this.peopleRepository.create(people);
  // }

  // @get('/people/count', {
  //   responses: {
  //     '200': {
  //       description: 'People model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(People)) where?: Where,
  // ): Promise<Count> {
  //   return await this.peopleRepository.count(where);
  // }

  // @get('/people', {
  //   responses: {
  //     '200': {
  //       description: 'Array of People model instances',
  //       content: {
  //         'application/json': {
  //           schema: { type: 'array', items: { 'x-ts-type': People } },
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.query.object('filter', getFilterSchemaFor(People)) filter?: Filter,
  // ): Promise<People[]> {
  //   return await this.peopleRepository.find(filter);
  // }

  // @patch('/people', {
  //   responses: {
  //     '200': {
  //       description: 'People PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody() people: People,
  //   @param.query.object('where', getWhereSchemaFor(People)) where?: Where,
  // ): Promise<Count> {
  //   return await this.peopleRepository.updateAll(people, where);
  // }

  // @get('/people/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'People model instance',
  //       content: { 'application/json': { 'x-ts-type': People } },
  //     },
  //   },
  // })
  // async findById(@param.path.number('id') id: number): Promise<People> {
  //   return await this.peopleRepository.findById(id);
  // }



  // @patch('/people/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'People PATCH success',
  //     },
  //   },
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody() people: People,
  // ): Promise<void> {
  //   await this.peopleRepository.updateById(id, people);
  // }

  // @del('/people/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'People DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.peopleRepository.deleteById(id);
  // }


  @get('/people')
  async findUser() {
    let sql = 'select * from [People]';
    db.connector.query(sql, function (err: AnyObject, results: People[]) {
      if (err) {
        console.log('error');
        throw err;
      } else {
        console.log('result');
        console.log(results);
        return results;
      }
    });

  }

  // @get('/people/{id}')
  @get('/people/{id}', {
    responses: {
      '200': {
        description: 'People model instance',
        content: { 'application/json': { 'x-ts-type': People } },
      },
    },
  })
  async findUserById(@param.path.string('id') id: string) {
    let sql = 'select * from [People] Where Id = ' + id;
    db.connector.query(sql, function (err: AnyObject, results: People) {
      if (err) {
        console.log('error');
        throw err;
      } else {
        console.log('result');
        console.log(results);
        return results;
      }
    });

  }
}
