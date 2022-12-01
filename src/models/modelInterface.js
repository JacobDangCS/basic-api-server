'use strict';

class ModelInterface {
    constructor(model){
        this.model = model;
    }

    //include CRUD operations (create, read, update, delete)

    async create(json){
        // console.log('this is our json', json);
        try {
        //substitutes in players.js => const newPlayer = await PlayerModel.create(req.body);
          let record = await this.model.create(json)
          return record;
        } catch(e){
            console.error('Error occured: create ModelInterface', e)
            return e;
        }
    }

    async read(id = null){
        try {
        let record;

          if (id){
            //substitutes in players.js => await PlayerModel.findOne({ where: { id } });
            //substitutes in players.js => await PlayerModel.findAll();
            record = await this.model.findOne( { where:{id} } );
          }  else {
            record = await this.model.findAll();
          }
            return record;
        } catch (e) {
            console.error('Error occured: read ModelInterface', e)
            return e;
        }
    }

    async readManyToOne(id, model){
        try {
            let record = await this.model.findOne( { where:{id} , include: model} );
            return record
        } catch (e) {
            console.error('Error occured: readManyToOne', e)
            return e;
        }
    }

    async update(json, id){
        //substitutes in players.js => const rePlayer = await PlayerModel.findOne({ where: { id } });

        try {
            await this.model.update(json, { where: {id} });
            let record = await this.model.findOne( { where:{id} } )
            return record
        } catch (e) {
            console.error('Error occured: update ModelInterface', e)
            return e;
        }

      //FINISH DELETE FUNCTION async delete(id){}  
    }
}

module.exports = ModelInterface