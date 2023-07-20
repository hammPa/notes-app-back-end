const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload; // ambil dari req
    const id = nanoid(15); // random
    const createdAt = new Date().toISOString(); // waktu saat ini
    const updateAt = createdAt; //sama dengan created

    const newNotes = { // objek baru dengan isi dari var sebelumnya
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNotes); // isi new notes dimasukkan ke notes

    const isSucces = notes.filter( note => note.id == id ).length>0;
    // note.id sama dengan id

    if(isSucces){ //jika true
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil di tambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201);
        return response;
    }

    const response = h.response({ // jika false
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}


const getAllNotesHandler = () => ({
    status: 'succes',
    data: {
        notes
    },
})



const getNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.filter( e => e.id==id )[0];

    if(note!=undefined){
        return {
            status: 'succes',
            data: {
                note
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;

}



const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex( note => note.id==id );

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title, tags, body, updateAt,
        }


        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}




const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex( note => note.id==id );

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}


module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };