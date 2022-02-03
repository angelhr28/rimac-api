import { Context, Handler } from 'aws-lambda';

import { PersonController } from './controller/PersonController';

const personController = new PersonController();

export const loadData: Handler = ( event: any ) => {
    return personController.loadData( event );
};

export const create: Handler = ( event: any, context: Context ) => {
    return personController.create( event, context );
};

export const update: Handler = ( event: any ) => personController.update( event );

export const find: Handler = () => personController.find();

export const findOne: Handler = ( event: any, context: Context ) => {
    return personController.findOne( event, context );
};

export const deleteOne: Handler = ( event: any ) => personController.deleteOne( event );
