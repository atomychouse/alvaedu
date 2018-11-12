from django import forms

class PasoUno(forms.Form):
    name = forms.CharField(label='Tu nombre', max_length=100,required=True)
    email = forms.EmailField(label='tu email',required=True)
    datetime = forms.DateTimeField(label='Fecha de tu evento',required=True)