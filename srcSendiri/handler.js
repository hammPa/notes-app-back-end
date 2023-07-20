let databases = require('./notes');
const generateId = require('./generateId');


const ambil = (request, h) => {
    const date = new Date().toISOString; // tanggal
    const {title, tags, body} = request.payload; // ambil dari payload
    
    if(title&&tags&&body===undefined){ // jika salah satu tidak ada
        return h.response({
            "status": "error",
            "message": "Catatan gagal untuk ditambahkan"
        }).code(500);
    }

    const catat = { // objek sementara 
        id: `notes-${generateId()}`,
        title,
        createdAt: date,
        updatedAt: new Date().toISOString,
        tags,
        body
    };

    // databases = databases.map( (e) => {
    //     if(e.id===catat.id){
    //         return;
    //     }
    //     databases.push(catat);
    // });

    databases.push(catat); // memasukkan objek sementara ke array database

    return h.response({
        "status": "success",
        "message": "Catatan berhasil ditambahkan",
        "data": {
          "noteId": `${catat.id}`
        }
      }).code(201);
}




const tambah = (request, h) => {
    const { id } = request.params;

    if(!id){ // jika tidak ada path id
        if(databases.length===0){ // jika length 0
            return h.response({
                "status": "success",
                "data": {
                  "notes": []
                }
            });
        }
        return h.response({ // jika length !=0
            "status": "success",
            "data": {
              "notes": [databases]
            }
        }).code(200);
    }

    // jika ada path id
    const catatan = databases.find( e => e.id==id );

    if(!catatan){ // jika id path != id array
        return h.response({
            "status": "fail",
            "message": "Catatan tidak ditemukan"
        }).code(404);
    }
    return h.response({ // jika id path == id array
        "status": "success",
        "data": {
          "note": catatan
        }
    }).code(200);
}


const ubah = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;

    // jika ada path id
    const catatan = databases.find( e => e.id===id );

    if(!catatan){ // jika id path != id array
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
        }).code(404);
    }


    catatan.title = title || catatan.title;
    catatan.tags = tags || catatan.tags;
    catatan.body = body || catatan.body;
    

    return h.response({ // jika id path == id array
        "status": "success",
        "message": "Catatan berhasil diperbaharui"
    }).code(200);

}


const hapus = (request, h) => {
    const {id} = request.params;

    const catatanIndex = databases.findIndex( e => e.id==id );
    
    if(catatanIndex==-1){ // jika tidak ada id yang sesuai dengan catatan
        return h.response({
            "status": "fail",
            "message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
        }).code(404);
    }

    databases.splice(catatanIndex, 1);
    return h.response({ // jika ada
        "status": "success",
        "message": "Catatan berhasil dihapus"
    }).code(200);
}


module.exports = {ambil, tambah, ubah, hapus};