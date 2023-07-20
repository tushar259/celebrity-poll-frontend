import jQuery from 'jquery';
if(process.client){
    window.$ = window.jQuery = jQuery;
}
export default {};