 RSSLink = {
schema:true,
 attributes: {
    id  : { type: 'integer',primaryKey:true, autoIncrement: true },
    originallink : { type: 'string',  required: true, unique: true },
  	cloakedlink:{type : 'string', unique:true}
  }
 };
 
 module.exports = RSSLink; 