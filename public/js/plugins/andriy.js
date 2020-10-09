const notificationTime = 3000;

(function(){
    function showInfoNotification(message){
        window.$.notify({
            icon: "add_alert",
            message: message
      
          }, {
            type: "info",
            timer: notificationTime,
            placement: {
              from: "top",
              align: "center"
            }
          }); 
    }

    
    var DiamondUI = {
        showInfoNotification: showInfoNotification
    }
    
    window.DiamondUI = DiamondUI;
}());

