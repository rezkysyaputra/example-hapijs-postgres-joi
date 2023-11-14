import Joi from '@hapi/joi';

export const validationBarang = Joi.object({
  nama: Joi.string().min(2).max(100).required(),
  harga: Joi.number().integer().required(),
  jumlah: Joi.number().integer().required(),
});
