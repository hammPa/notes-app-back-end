const {ambil, tambah, ubah, hapus} = require('./handler');


const routes = [
    { // menambah catatan
        method: 'POST',
        path: '/notes',
        handler: ambil,
    },
    { // mengambil catatan
        method: 'GET',
        path: '/notes/{id?}',
        handler: tambah,
    },
    { // mengupdate catatan
        method: 'PUT',
        path: '/notes/{id?}',
        handler: ubah,
    },
    { // menghapus catatan
        method: 'DELETE',
        path: '/notes/{id?}',
        handler: hapus,
    },
]

module.exports = routes;