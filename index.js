var cards = document.getElementById("cards")
var btn = document.getElementById("btn")


function Card (mscName, artistaa, durationn, rankingMsc, albumName, artistPhoto, albumPhoto, prev){
    this.mscName = mscName
    this.artistaa = artistaa
    this.durationn = durationn
    this.rankingMsc = rankingMsc
    this.albumName = albumName
    this.artistPhoto = artistPhoto
    this.albumPhoto = albumPhoto
    this.prev = prev
}

btn.onclick = async function () {
    var search = document.getElementById("searcher").value

    await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "63e592375cmsh019ee91a4363c48p1e4758jsn0794fcb2a4bc"
        }
    })
    .then(response => 
        response.json()
    ).then(res => {
        cards.textContent = ""
        res.data.forEach(i =>{
            info = new Card (i.title, i.artist.name, i.duration, i.rank, i.album.title, i.artist.picture_medium, i.album.cover_medium, i.preview)


            var divcard = document.createElement("div")

            var nomeMusica = document.createElement("p")
            nomeMusica.textContent = "nome da musica: " + info.mscName

            var nomeArtista = document.createElement("p")
            nomeArtista.textContent = "Nome do artista: "+ info.artistaa

            var duracao = document.createElement("p")
            duracao.textContent = "Duração: " + info.durationn

            var rankingMscc = document.createElement("p")
            rankingMscc.textContent = "Ranking: " + info.rankingMsc

            var tituloAlbum = document.createElement("p")
            tituloAlbum.textContent = "Nome do Album: " + info.albumName

            var imagemAlbum = document.createElement("img")
            imagemAlbum.src = info.albumPhoto

            var imagemArtista = document.createElement("img")
            imagemArtista.src = info.artistPhoto

            var previa = document.createElement("audio")
            previa.src = info.prev
            console.log(previa)
            
            document.body.append(previa)
            var botao = document.createElement("button")
            botao.textContent = "Preview"

            botao.addEventListener("click", () => {
                stopAllAudio(previa)
            })

            divcard.append(nomeMusica, nomeArtista, duracao, rankingMscc, tituloAlbum, imagemAlbum, imagemArtista, botao)
            cards.appendChild(divcard)

        })
    })
}
function stopAllAudio(previa){
    var allAudios = document.querySelectorAll('audio')
    allAudios.forEach(audio => {
        audio.pause()
        audio.currentTime = 0
    })

    previa.play()
}
