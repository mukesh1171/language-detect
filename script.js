let feature
let model;
fetch('cv.json')
    .then(response => response.json())
    .then(data =>{
        feature = data['feature'];    
    })

function transform(words) {
    var encd = tf.zeros([1,5215,1]).arraySync()
    for(let i=0; i<feature.length;i++){
  	let index = feature.indexOf(words[i]);
    if (index > -1) {
        encd[0][index] =1
    }
  }  
  return encd
}

async function start() {
    const labels = ['English', 'Hindi', 'Kananda', 'Malayalam', 'Tamil', 'Telugu']
    
    model = await tf.loadLayersModel('model/model.json')
    var input_sentence = document.getElementById("input").value;
    words = input_sentence.split(' ')
    out = transform(words)
    out = tf.tensor(out)
    let result = model.predict(out).arraySync()[0]
    let index = result.indexOf(Math.max(...result));
    document.getElementById('story').innerHTML = labels[index];
}
