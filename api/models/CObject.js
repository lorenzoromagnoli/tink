/**
* CObject.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {

  	name: {
  		type: 'string',
  		defaultsTo: 'name'
  	},

  	project: {
  		model:'project',
      required:true
  	},

    image:{
      type: 'string',
      defaultsTo: 'connectedObject_default'
    },	

  	positionX:{
  		type:'integer',
      defaultsTo: '100'

  	},

  	positionY:{
  		type:'integer',
      defaultsTo: '100'

  	},
    cODatas:{
      collection:'cOData',
      via:'cObject',
    },
    
    cOTriggers:{
      collection:'cOTrigger',
      via:'cObject',
    },

    cOActions:{
      collection:'cOAction',
      via:'cObject',
    },
  }
};

