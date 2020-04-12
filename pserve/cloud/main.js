/*Parse.Cloud.define('hello', function(req, res) {
    return 'Hi';
});*/

const sharp = require('sharp');
sharp('sss').resize(250,250).rotate();
Parse.Cloud.beforeSave("dubailandmarks", async (request, response) => {
    //Get photo name
    let photo_name = request.object.get('photo').name();

    //Check if we have different image from the one that we have originally
    if (request.object.get('photo').name() !== request.original.get('photo').name()) {
        //Download photo image
        await Parse.Cloud.httpRequest({ url: request.object.get('photo').url() }).then(async function(data) {
            //Get data (buffer type) and pass it to sharp library
            let tempData = await sharp(data.buffer).rotate().resize(250, 250, {
                withoutEnlargement: true, //keep the aspect ratio
                fit: sharp.fit.inside //better than cover keep this //TODO check fill
            }).toBuffer();

            //Make it base64 (from docs)
            let res64 = tempData.toString('base64');
            //Add thumbnail prefix to name //TODO remove
            let photo_thumb = new Parse.File('thumbnail_' + photo_name, {base64: res64});

            //Save thumbnail. In success set it to object
            await photo_thumb.save().then(
                (success)=>{
                    request.object.set('photo_thumb',photo_thumb);
                },
                (failure)=>{
                    console.log(failure);
                }
            ).catch((e)=>{console.log(e)});

            //console.log(test);
            //request.object.set('photo_thumb',test);
            //let res64 = result.toString('base64');
            //console.log(res64);
            //request.object.set('description','lalala');

        });
    }
    response.success();


});
