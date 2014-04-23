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
  		defaultsTo: 'new data to track'
  	},

    codeVariables:{
      type:'string',
    },

    codeSetup:{
      type:'string',
    },

    codefunction:{
      type:'string',
    },

  	cObject: {
  		model:'cObject',
  	},

  }
};
