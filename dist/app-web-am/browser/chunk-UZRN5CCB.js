import{a as T}from"./chunk-WFTRRFI5.js";import{b}from"./chunk-LSH4YPTB.js";import{a as _,b as j}from"./chunk-RRZRMO3V.js";import"./chunk-U7JTDUAZ.js";import{$a as p,Ac as R,Bc as l,Cc as S,Dc as q,Ec as r,Fc as x,Gc as I,Hc as N,Jc as M,Kc as k,La as n,Lc as E,Ma as c,Ua as s,Ub as F,Za as t,_a as o,fb as g,kb as u,la as v,mb as h,pb as w,rc as C,yc as y}from"./chunk-UX52HZP3.js";var Q=(()=>{let m=class m{constructor(a,i,e,d){this.router=a,this.store=i,this.dialog=e,this.fb=d,this.registerForm=new q({name:new r(""),surname:new r(""),email:new r(""),password:new r(""),passwordConfirm:new r("")}),this.msg=""}ngOnInit(){this.registerForm=this.fb.group({name:new r("",l.required),surname:new r("",l.required),email:new r("",[l.required,l.email]),password:new r("",l.required),passwordConfirm:new r("",l.required)})}onSubmit(a){if(a.preventDefault(),this.registerForm.valid)if(this.registerForm.controls.password.value===this.registerForm.controls.passwordConfirm.value){let i={name:this.registerForm.controls.name.value?.toUpperCase()||"",surname:this.registerForm.controls.surname.value?.toUpperCase()||"",email:this.registerForm.controls.email.value?.toUpperCase()||"",password:this.registerForm.controls.password.value};this.store.dispatch(T({user:i})),this.store.select(y).subscribe(e=>{e==="Successfully registered"&&this.openNewModal("Registro exitoso!","Tu registro ha sido exitoso, ya puedes acceder a la plataforma \u{1F60D}\u{1F60D}")})}else this.msg="Las contrase\xF1as no coinciden"}goToLoginPage(){this.router.navigate(["/login"])}openNewModal(a,i){this.dialog.open(j,{data:{title:a,message:i}}).afterClosed().subscribe(d=>{console.log("modal: ",d),this.router.navigate(["/login"])})}};m.\u0275fac=function(i){return new(i||m)(c(b),c(C),c(_),c(N))},m.\u0275cmp=v({type:m,selectors:[["app-register"]],standalone:!0,features:[w],decls:25,vars:12,consts:[["id","body-register",1,"w-full","h-full","flex","justify-center","items-center"],[1,"flex","flex-col","justify-center","items-center","bg-white","opacity-90","shadow-lg","border-2","rounded-lg","w-80","h-fit","p-4"],[1,"font-bold","text-slate-800","text-4xl","text-center","my-8"],[1,"w-full","p-0","flex","justify-center","flex-col","items-center",3,"formGroup","submit"],[1,"m-2","w-full"],["inputId","name","inputName","name","placeholder","Primer nombre",3,"control","inputRequired"],["inputId","surname","inputName","surname","placeholder","Primer apellido",3,"control","inputRequired"],["inputId","email","inputName","email","placeholder","Correo electr\xF3nico",3,"control","inputRequired"],["inputId","password","inputName","password","placeholder","Contrase\xF1a",3,"control","inputRequired"],["inputId","passwordConfirm","inputName","passwordConfirm","placeholder","Repita la contrase\xF1a",3,"control","inputRequired"],[1,"relative","w-full"],[1,"absolute","w-full","text-center","text-red-700","text-sm"],[1,"my-6","w-full"],["buttonType","submit"],[1,"text-slate-600"],[1,"text-pink-500","hover:underline","hover:cursor-pointer",3,"click"]],template:function(i,e){i&1&&(t(0,"div",0)(1,"div",1)(2,"h1",2),u(3," Nuevo registro "),o(),t(4,"form",3),g("submit",function(A){return e.onSubmit(A)}),t(5,"div",4),p(6,"app-am-input",5),o(),t(7,"div",4),p(8,"app-am-input",6),o(),t(9,"div",4),p(10,"app-am-input",7),o(),t(11,"div",4),p(12,"app-am-input",8),o(),t(13,"div",4),p(14,"app-am-input",9),o(),t(15,"div",10)(16,"p",11),u(17),o()(),t(18,"div",12)(19,"app-am-button",13),u(20,"Registrarte"),o()(),t(21,"p",14),u(22," \xBFYa tienes una cuenta? "),t(23,"a",15),g("click",function(){return e.goToLoginPage()}),u(24,"Iniciar sesi\xF3n"),o()()()()()),i&2&&(n(4),s("formGroup",e.registerForm),n(2),s("control",e.registerForm.controls.name)("inputRequired",!0),n(2),s("control",e.registerForm.controls.surname)("inputRequired",!0),n(2),s("control",e.registerForm.controls.email)("inputRequired",!0),n(2),s("control",e.registerForm.controls.password)("inputRequired",!0),n(2),s("control",e.registerForm.controls.passwordConfirm)("inputRequired",!0),n(3),h(" ",e.msg," "))},dependencies:[F,E,R,k,M,x,S,I],styles:['#body-register[_ngcontent-%COMP%]{background-image:url("./media/9104593-CVIAY5CR.jpg");background-size:cover;background-position:center center;background-repeat:no-repeat;overflow:auto}']});let f=m;return f})();export{Q as default};