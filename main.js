const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595'


const request = require ('request')
const cheerio = require('cheerio')

request(url , cb)

function cb(err, response, html){
    if (err){
        console.error(err)
    }else{
        extractlink(html)

    }
}

function extractlink(html){
    let $ = cheerio.load(html)
    let anchorElem = $('.ds-block.ds-text-center.ds-uppercase.ds-text-ui-typo-primary.ds-underline-offset-4.ds-block')
    let link = anchorElem.attr("href");
    // console.log(anchorElem)

    let fullLink = 'https://www.espncricinfo.com/'+ link
    // console.log(fullLink)
    getAllMatchLink(fullLink)

}

function getAllMatchLink(uri){
    request(uri, function(error, response, html){
        if (error){
            console.error(err)
        }else{
            extractAllLink(html)
    
        }
    } )
}


function extractAllLink(html){
    let $ = cheerio.load(html)

    
}
