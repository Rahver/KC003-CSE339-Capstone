var str = " www.17ebook.com www.clicnews.com www.gardensrestaurantandcatering.com www.ginedis.com www.hihanin.com www.kingfamilyphotoalbum.com www.likaraoke.com www.purplehoodie.com www.stock888.cn www.tathli.com www.teamclouds.com www.texaswhitetailfever.com www.wadefamilytree.org www.yt118.com www.firststarbank.online www.sofincocredit.com www.rechargesstatut.com www.neosurfverificator.com www.financesunion.com www.jwlengrconsult.com www.escshipping.com www.blackstonegems.com www.ahabudhabi.com www.trackcourierservice.com www.klikbcaonline.com www.igseeds.com www.garantibankasias.com www.uibltdae.com www.diamondswiftexp.com www.weedsdomain.com www.carbonicallc.com www.petslovies.com www.denizlawfirm.com www.rbsgroupsplc.com www.rbsbnk.com www.airwayexpressdelivery.com www.glodocuments.com www.corisbktg.com www.otisioil.com www.usblgroups.com www.hostfurniture.com www.gomedistrains.com www.cpetlovershome.com www.primepethome.com www.overlineexpress.com www.pharmacysteroid.com www.psychedelicextra.com www.securekeeping.com www.jetportlogistics.com www.weedcally.com www.xanaxshop.com www.cannashoponline.com www.weedcartclub.com www.banknordikonline.com www.unitedbridgebank.com www.avionoffshore.com www.fcreditbank.com www.landoltix.com www.gfrauthority.com www.cannabisloversbay.com www.globalshipsandstorage.com www.rapidworldfreights.com www.buylsdblotter.com www.lets420all.com www.actavischemicals.com www.cannabisonlinebuy.com www.simplehomeinvestments.com www.authenticielts.com www.travelinsafety.com www.schnellertransit.com www.narrow-cure.com www.exottichhome.com www.cannahempshire.com www.beldenburghotel.com www.420mmjstore.com www.nasbismed.com www.gunnarvikoil.com www.wopnooil.com www.stockvillefinance.com www.theglobal-impact.com www.petrada-autoparts.com www.fvis-us.com ";
// data for websites
var outUrl;
chrome.windows.getCurrent(function(window) 
{
    chrome.tabs.query(
					{
					active: true,
					windowId: window.id
					}, 
	function (tabs) {
					var tab = tabs[0];
					var ref = tab.url;
					outUrl=ref;
					var n = str.search(ref);	
if (n > 1) {
var web_data = "hazardous website";
			}			 
else{
  var web_data ="safe website";
}
document.getElementById("myvar").innerHTML = web_data;
var protocol_name = new URL(outUrl).protocol;
var checkUrl = new URL(outUrl).hostname; 
document.getElementById("host1").innerHTML = checkUrl;
    });
});
document.getElementById("btn").addEventListener("click",reportFunction);
function reportFunction(){
window.location.href = "Mailto:rahver0@gmail.com?subject=Fake Website" + "&body=" +outUrl;  
}