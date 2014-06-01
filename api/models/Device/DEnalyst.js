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
      defaultsTo: 'dataAnalyst_default'
    },	

  	positionX:{
  		type:'integer',
      defaultsTo: '500'

  	},

  	positionY:{
  		type:'integer',
      defaultsTo: '100'

  	},
    dADatas:{
      collection:'dAData',
      via:'dAnalyst',
    },
    
    dATriggers:{
      collection:'dATrigger',
      via:'dAnalyst',
    },

    dAActions:{
      collection:'dAAction',
      via:'dAnalyst',
    },
  }
};

