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
  		defaultsTo: 'New Web Service'
  	},

  	project: {
  		model:'project',
      required:true
  	},

    image:{
      type: 'string',
      defaultsTo: 'webService_default'
    },	

  	positionX:{
  		type:'integer',
      defaultsTo: '500'

  	},

  	positionY:{
  		type:'integer',
      defaultsTo: '100'

  	},
    wSDatas:{
      collection:'wSData',
      via:'wService',
    },
    
    wSTriggers:{
      collection:'wSTrigger',
      via:'wService',
    },

    wSActions:{
      collection:'wSAction',
      via:'wService',
    },
  }
};

