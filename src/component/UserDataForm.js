
import React, { Component } from 'react'
import { connect } from "react-redux";
import  * as actions from "../action/userAction";
import { bindActionCreators } from "redux";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const numberIdRegex = RegExp(
    /^([1-9]|10)$/
);

const PhoneNumberREgex = RegExp(
    /^[0-9\-\+]{9,15}$/
)

const passportIdRegex = RegExp(
    /^(?!0{3,20})[a-zA-Z0-9]{3,20}$/
);



const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
}

class UserDataForm extends Component {

    state = {
        ...this.returnStateObject(),
        formErrors: {
            title: '',
            firstName: '',
            lastName: '',
            birthday: '',
            nationality: '',
            citizenId: '',
            gender: '',
            countryCode: '',
            mobilePhone: '',
            passportNo: '',
            expectedSalary: ''
        },
            allChecked: false,
            checkBox: [
                { id: '', name: "", isChecked: false }
            ]
    }
    
    returnStateObject(){
        if(this.props.currectIndex == -1)
            return{
                title: '',
                firstName: '',
                lastName: '',
                birthday: '',
                nationality: '',
                citizenId: '',
                gender: '',
                countryCode: '',
                mobilePhone: '',
                passportNo: '',
                expectedSalary: '',
                formErrors: {
                        title: '',
                        firstName: '',
                        lastName: '',
                        birthday: '',
                        nationality: '',
                        citizenId: '',
                        gender: '',
                        countryCode: '',
                        mobilePhone: '',
                        passportNo: '',
                        expectedSalary: ''
                },
            }
        else 
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentIndex != this.props.currentIndex || prevProps.list.lenght != this.props.list.lenght)
        this.setState({...this.returnStateObject()})
    }

    handleInputChange = e => {
        
        this.setState({
            [e.target.name] : e.target.value
        })

        const { name, value } = e.target;
        let formErrors = {...this.state.formErrors };
        
        switch(name){
            case "title":
                formErrors.title =
                    value.length == "" ? "Please select title required" : "";
                break;
            case "firstName":
                formErrors.firstName =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "birthday":
                formErrors.birthday =
                    value.length < 6 ? "Please enter birth day required" : "";
                break;
            case "nationality":
                formErrors.nationality =
                    value.length == "" ? "Please select nationality required" : "";
                break;
            case "citizenId":
                formErrors.citizenId = 
                    numberIdRegex.test(value) || value.length == 13 ? "" : "Please enter citizen id correct required";
                break;
            case "gender":
                formErrors.gender =
                    value.length == "" ? "Please tick gender required" : "";
                break;
            case "countryCode":
                formErrors.countryCode =
                    value.length == "" ? "Please select country code required" : "";
                break;
            case "mobilePhone":
                formErrors.mobilePhone =
                PhoneNumberREgex.test(value) || value.length == 10 ? "" : "Please enter mobile phone correct require";
                break;
            case "passportNo":
                formErrors.passportNo =
                    passportIdRegex.test(value) ? "" : "Please enter passport no id required";
                break;
            case "expectedSalary":
                formErrors.expectedSalary =
                    value.length == ""? "minimum 3 characaters required" : "";
                break;
        
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
    };

    handleSubmit = e => {
        e.preventDefault()

        if (formValid(this.state)) {
            if(this.props.currentIndex == -1)
            this.props.insertTransaction(this.state)
        else
            this.props.updateTransaction(this.state)
          } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
          }
    }

    render() {

        const CitizenIdFormat = [
            { char: /\d/, repeat: 1 },
            { exactly: "-" },
            { char: /\d/, repeat: 4 },
            { exactly: "-" },
            { char: /\d/, repeat: 5 },
            { exactly: "-" },
            { char: /\d/, repeat: 2 },
            { exactly: "-" },
            { char: /\d/, repeat: 1 }
        ];

        const { formErrors } = this.state;

        return (
            // Form Add Data
            <Form  onSubmit = {this.handleSubmit} autoComplete="off">
                
                <FormGroup row>
                    <Label sm={1} style={{maxWidth: '6.5%'}} >Title :</Label>
                    <Col sm={2}>
                        <Input style={{width: '60%'}} type="select" name="title"  className={formErrors.title.length > 0 ? "error" : null}
                            value={this.state.title} onChange={this.handleInputChange}>
                            <option value="select"></option>
                            <option value="Mr">Mr.</option>
                            <option value="Mrs">Mrs.</option>
                            <option value="Miss">Miss.</option>
                        </Input >
                    </Col>

                    {formErrors.title.length > 0 && (
                        <span className="errorMessage">{formErrors.title}</span>
                    )}

                    <Label sm={2} style={{maxWidth: '10.5%'}}>First Name :</Label>
                    <Col sm={3}>
                        <Input
                            className={formErrors.firstName.length > 0 ? "error" : null}
                            name="firstName"
                            placeholder="First Name" 
                            value={this.state.firstName} 
                            onChange={this.handleInputChange}
                        />
                        {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">{formErrors.firstName}</span>
                        )}
                    </Col>
                   
                    <Label sm={2} style={{maxWidth: '10.5%'}}>Last Name :</Label>
                    <Col sm={3}>
                        <Input 
                            className={formErrors.lastName.length > 0 ? "error" : null}
                            name="lastName"
                            placeholder="Last Name" 
                            value={this.state.lastName} 
                            onChange={this.handleInputChange}/>

                        {formErrors.lastName.length > 0 && (
                            <span className="errorMessage">{formErrors.lastName}</span>
                        )}
                    </Col>
            
                </FormGroup>

                <FormGroup row>
                    <Label sm={2} style={{maxWidth: '10%'}}>Birthday : </Label>
                    <Col sm={3}>
                        <Input type="date" 
                                className={formErrors.birthday.length > 0 ? "error" : null} 
                                name="birthday" value={this.state.birthday} 
                                onChange={this.handleInputChange}/>
                        
                        {formErrors.birthday.length > 0 && (
                            <span className="errorMessage">{formErrors.birthday}</span>
                        )}
                    </Col>

                    <Label sm={2} style={{maxWidth: '10.5%'}}>Nationality : </Label>
                    <Col sm={3}>
                        <Input type="select"
                            className={formErrors.nationality.length > 0 ? "error" : null}
                            name="nationality" value={this.state.nationality} onChange={this.handleInputChange}>
                            <option value="select"></option>
                            <option value="afghan">Afghan</option>
                            <option value="albanian">Albanian</option>
                            <option value="algerian">Algerian</option>
                            <option value="american">American</option>
                            <option value="andorran">Andorran</option>
                            <option value="angolan">Angolan</option>
                            <option value="antiguans">Antiguans</option>
                            <option value="argentinean">Argentinean</option>
                            <option value="armenian">Armenian</option>
                            <option value="australian">Australian</option>
                            <option value="austrian">Austrian</option>
                            <option value="azerbaijani">Azerbaijani</option>
                            <option value="bahamian">Bahamian</option>
                            <option value="bahraini">Bahraini</option>
                            <option value="bangladeshi">Bangladeshi</option>
                            <option value="barbadian">Barbadian</option>
                            <option value="barbudans">Barbudans</option>
                            <option value="batswana">Batswana</option>
                            <option value="belarusian">Belarusian</option>
                            <option value="belgian">Belgian</option>
                            <option value="belizean">Belizean</option>
                            <option value="beninese">Beninese</option>
                            <option value="bhutanese">Bhutanese</option>
                            <option value="bolivian">Bolivian</option>
                            <option value="bosnian">Bosnian</option>
                            <option value="brazilian">Brazilian</option>
                            <option value="british">British</option>
                            <option value="bruneian">Bruneian</option>
                            <option value="bulgarian">Bulgarian</option>
                            <option value="burkinabe">Burkinabe</option>
                            <option value="burmese">Burmese</option>
                            <option value="burundian">Burundian</option>
                            <option value="cambodian">Cambodian</option>
                            <option value="cameroonian">Cameroonian</option>
                            <option value="canadian">Canadian</option>
                            <option value="cape verdean">Cape Verdean</option>
                            <option value="central african">Central African</option>
                            <option value="chadian">Chadian</option>
                            <option value="chilean">Chilean</option>
                            <option value="chinese">Chinese</option>
                            <option value="colombian">Colombian</option>
                            <option value="comoran">Comoran</option>
                            <option value="congolese">Congolese</option>
                            <option value="costa rican">Costa Rican</option>
                            <option value="croatian">Croatian</option>
                            <option value="cuban">Cuban</option>
                            <option value="cypriot">Cypriot</option>
                            <option value="czech">Czech</option>
                            <option value="danish">Danish</option>
                            <option value="djibouti">Djibouti</option>
                            <option value="dominican">Dominican</option>
                            <option value="dutch">Dutch</option>
                            <option value="east timorese">East Timorese</option>
                            <option value="ecuadorean">Ecuadorean</option>
                            <option value="egyptian">Egyptian</option>
                            <option value="emirian">Emirian</option>
                            <option value="equatorial guinean">Equatorial Guinean</option>
                            <option value="eritrean">Eritrean</option>
                            <option value="estonian">Estonian</option>
                            <option value="ethiopian">Ethiopian</option>
                            <option value="fijian">Fijian</option>
                            <option value="filipino">Filipino</option>
                            <option value="finnish">Finnish</option>
                            <option value="french">French</option>
                            <option value="gabonese">Gabonese</option>
                            <option value="gambian">Gambian</option>
                            <option value="georgian">Georgian</option>
                            <option value="german">German</option>
                            <option value="ghanaian">Ghanaian</option>
                            <option value="greek">Greek</option>
                            <option value="grenadian">Grenadian</option>
                            <option value="guatemalan">Guatemalan</option>
                            <option value="guinea-bissauan">Guinea-Bissauan</option>
                            <option value="guinean">Guinean</option>
                            <option value="guyanese">Guyanese</option>
                            <option value="haitian">Haitian</option>
                            <option value="herzegovinian">Herzegovinian</option>
                            <option value="honduran">Honduran</option>
                            <option value="hungarian">Hungarian</option>
                            <option value="icelander">Icelander</option>
                            <option value="indian">Indian</option>
                            <option value="indonesian">Indonesian</option>
                            <option value="iranian">Iranian</option>
                            <option value="iraqi">Iraqi</option>
                            <option value="irish">Irish</option>
                            <option value="israeli">Israeli</option>
                            <option value="italian">Italian</option>
                            <option value="ivorian">Ivorian</option>
                            <option value="jamaican">Jamaican</option>
                            <option value="japanese">Japanese</option>
                            <option value="jordanian">Jordanian</option>
                            <option value="kazakhstani">Kazakhstani</option>
                            <option value="kenyan">Kenyan</option>
                            <option value="kittian and nevisian">Kittian and Nevisian</option>
                            <option value="kuwaiti">Kuwaiti</option>
                            <option value="kyrgyz">Kyrgyz</option>
                            <option value="laotian">Laotian</option>
                            <option value="latvian">Latvian</option>
                            <option value="lebanese">Lebanese</option>
                            <option value="liberian">Liberian</option>
                            <option value="libyan">Libyan</option>
                            <option value="liechtensteiner">Liechtensteiner</option>
                            <option value="lithuanian">Lithuanian</option>
                            <option value="luxembourger">Luxembourger</option>
                            <option value="macedonian">Macedonian</option>
                            <option value="malagasy">Malagasy</option>
                            <option value="malawian">Malawian</option>
                            <option value="malaysian">Malaysian</option>
                            <option value="maldivan">Maldivan</option>
                            <option value="malian">Malian</option>
                            <option value="maltese">Maltese</option>
                            <option value="marshallese">Marshallese</option>
                            <option value="mauritanian">Mauritanian</option>
                            <option value="mauritian">Mauritian</option>
                            <option value="mexican">Mexican</option>
                            <option value="micronesian">Micronesian</option>
                            <option value="moldovan">Moldovan</option>
                            <option value="monacan">Monacan</option>
                            <option value="mongolian">Mongolian</option>
                            <option value="moroccan">Moroccan</option>
                            <option value="mosotho">Mosotho</option>
                            <option value="motswana">Motswana</option>
                            <option value="mozambican">Mozambican</option>
                            <option value="namibian">Namibian</option>
                            <option value="nauruan">Nauruan</option>
                            <option value="nepalese">Nepalese</option>
                            <option value="new zealander">New Zealander</option>
                            <option value="ni-vanuatu">Ni-Vanuatu</option>
                            <option value="nicaraguan">Nicaraguan</option>
                            <option value="nigerien">Nigerien</option>
                            <option value="north korean">North Korean</option>
                            <option value="northern irish">Northern Irish</option>
                            <option value="norwegian">Norwegian</option>
                            <option value="omani">Omani</option>
                            <option value="pakistani">Pakistani</option>
                            <option value="palauan">Palauan</option>
                            <option value="panamanian">Panamanian</option>
                            <option value="papua new guinean">Papua New Guinean</option>
                            <option value="paraguayan">Paraguayan</option>
                            <option value="peruvian">Peruvian</option>
                            <option value="polish">Polish</option>
                            <option value="portuguese">Portuguese</option>
                            <option value="qatari">Qatari</option>
                            <option value="romanian">Romanian</option>
                            <option value="russian">Russian</option>
                            <option value="rwandan">Rwandan</option>
                            <option value="saint lucian">Saint Lucian</option>
                            <option value="salvadoran">Salvadoran</option>
                            <option value="samoan">Samoan</option>
                            <option value="san marinese">San Marinese</option>
                            <option value="sao tomean">Sao Tomean</option>
                            <option value="saudi">Saudi</option>
                            <option value="scottish">Scottish</option>
                            <option value="senegalese">Senegalese</option>
                            <option value="serbian">Serbian</option>
                            <option value="seychellois">Seychellois</option>
                            <option value="sierra leonean">Sierra Leonean</option>
                            <option value="singaporean">Singaporean</option>
                            <option value="slovakian">Slovakian</option>
                            <option value="slovenian">Slovenian</option>
                            <option value="solomon islander">Solomon Islander</option>
                            <option value="somali">Somali</option>
                            <option value="south african">South African</option>
                            <option value="south korean">South Korean</option>
                            <option value="spanish">Spanish</option>
                            <option value="sri lankan">Sri Lankan</option>
                            <option value="sudanese">Sudanese</option>
                            <option value="surinamer">Surinamer</option>
                            <option value="swazi">Swazi</option>
                            <option value="swedish">Swedish</option>
                            <option value="swiss">Swiss</option>
                            <option value="syrian">Syrian</option>
                            <option value="taiwanese">Taiwanese</option>
                            <option value="tajik">Tajik</option>
                            <option value="tanzanian">Tanzanian</option>
                            <option value="thai">Thai</option>
                            <option value="togolese">Togolese</option>
                            <option value="tongan">Tongan</option>
                            <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                            <option value="tunisian">Tunisian</option>
                            <option value="turkish">Turkish</option>
                            <option value="tuvaluan">Tuvaluan</option>
                            <option value="ugandan">Ugandan</option>
                            <option value="ukrainian">Ukrainian</option>
                            <option value="uruguayan">Uruguayan</option>
                            <option value="uzbekistani">Uzbekistani</option>
                            <option value="venezuelan">Venezuelan</option>
                            <option value="vietnamese">Vietnamese</option>
                            <option value="welsh">Welsh</option>
                            <option value="yemenite">Yemenite</option>
                            <option value="zambian">Zambian</option>
                            <option value="zimbabwean">Zimbabwean</option>
                        </Input>
                        {formErrors.nationality.length > 0 && (
                            <span className="errorMessage">{formErrors.nationality}</span>
                        )}
                    </Col>

                </FormGroup>

                <FormGroup row>
                    <Label md={2} style={{maxWidth: '10%'}}>Citizen ID : </Label>
                    <Col sm={3}>
                        <Input 
                            name="citizenId"
                            className={formErrors.citizenId.length > 0 ? "error" : null}
                            value={this.state.citizenId} 
                            onChange={this.handleInputChange}
                            placeholder="X-XXXX-XXXXX-XX-X"
                            
                        />

                        {formErrors.citizenId.length > 0 && (
                            <span className="errorMessage">{formErrors.citizenId}</span>
                        )}
                    </Col>
                </FormGroup>

                
                <FormGroup row className={formErrors.citizenId.length > 0 ? "error" : null} 
                    value={this.state.gender} 
                    onChange={this.handleInputChange}>
                    <Label sm={3} style={{maxWidth: '12%'}}>Gender : </Label>
                    <Col sm={9} style={{paddingTop: '10px'}}>
                        <Input type="radio" id="male" name="gender" value="Male" />
                        <Label>Male</Label>&emsp;&emsp;
                        <Input type="radio" id="female" name="gender" value="Female" />
                        <Label>Female</Label>&emsp;&emsp;
                        <Input type="radio" id="unisex" name="gender" value="Unisex" />
                        <Label>Unisex</Label>
                        {formErrors.gender.length > 0 && (
                            <span className="errorMessage">{formErrors.gender}</span>
                        )}
                    </Col>
                </FormGroup>
                

                <FormGroup row>
                    <Label sm={3} style={{maxWidth: '12.5%'}}>Mobile Phone : </Label>
                    <Col sm={2} >
                        <Input type="select" name="countryCode" 
                                value={this.state.countryCode} 
                                onChange={this.handleInputChange}
                                className={formErrors.countryCode.length > 0 ? "error" : null}>
                            <option value="44">UK (+44)</option>
                            <option value="1">USA (+1)</option>
                            <optgroup Label="Other countries">
                            	<option value="213">Algeria (+213)</option>
                            	<option value="376">Andorra (+376)</option>
                            	<option value="244">Angola (+244)</option>
                            	<option value="1264">Anguilla (+1264)</option>
                            	<option value="1268">Antigua &amp; Barbuda (+1268)</option>
                            	<option value="54">Argentina (+54)</option>
                            	<option value="374">Armenia (+374)</option>
                            	<option value="297">Aruba (+297)</option>
                            	<option value="61">Australia (+61)</option>
                            	<option value="43">Austria (+43)</option>
                            	<option value="994">Azerbaijan (+994)</option>
                            	<option value="1242">Bahamas (+1242)</option>
                            	<option value="973">Bahrain (+973)</option>
                            	<option value="880">Bangladesh (+880)</option>
                            	<option value="1246">Barbados (+1246)</option>
                            	<option value="375">Belarus (+375)</option>
                            	<option value="32">Belgium (+32)</option>
                            	<option value="501">Belize (+501)</option>
                            	<option value="229">Benin (+229)</option>
                            	<option value="1441">Bermuda (+1441)</option>
                            	<option value="975">Bhutan (+975)</option>
                            	<option value="591">Bolivia (+591)</option>
                            	<option value="387">Bosnia Herzegovina (+387)</option>
                            	<option value="267">Botswana (+267)</option>
                            	<option value="55">Brazil (+55)</option>
                            	<option value="673">Brunei (+673)</option>
                            	<option value="359">Bulgaria (+359)</option>
                            	<option value="226">Burkina Faso (+226)</option>
                            	<option value="257">Burundi (+257)</option>
                            	<option value="855">Cambodia (+855)</option>
                            	<option value="237">Cameroon (+237)</option>
                            	<option value="1">Canada (+1)</option>
                            	<option value="238">Cape Verde Islands (+238)</option>
                            	<option value="1345">Cayman Islands (+1345)</option>
                            	<option value="236">Central African Republic (+236)</option>
                            	<option value="56">Chile (+56)</option>
                            	<option value="86">China (+86)</option>
                            	<option value="57">Colombia (+57)</option>
                            	<option value="269">Comoros (+269)</option>
                            	<option value="242">Congo (+242)</option>
                            	<option value="682">Cook Islands (+682)</option>
                            	<option value="506">Costa Rica (+506)</option>
                            	<option value="385">Croatia (+385)</option>
                            	<option value="53">Cuba (+53)</option>
                            	<option value="90392">Cyprus North (+90392)</option>
                            	<option value="357">Cyprus South (+357)</option>
                            	<option value="42">Czech Republic (+42)</option>
                            	<option value="45">Denmark (+45)</option>
                            	<option value="253">Djibouti (+253)</option>
                            	<option value="1809">Dominica (+1809)</option>
                            	<option value="1809">Dominican Republic (+1809)</option>
                            	<option value="593">Ecuador (+593)</option>
                            	<option value="20">Egypt (+20)</option>
                            	<option value="503">El Salvador (+503)</option>
                            	<option value="240">Equatorial Guinea (+240)</option>
                            	<option value="291">Eritrea (+291)</option>
                            	<option value="372">Estonia (+372)</option>
                            	<option value="251">Ethiopia (+251)</option>
                            	<option value="500">Falkland Islands (+500)</option>
                            	<option value="298">Faroe Islands (+298)</option>
                            	<option value="679">Fiji (+679)</option>
                            	<option value="358">Finland (+358)</option>
                            	<option value="33">France (+33)</option>
                            	<option value="594">French Guiana (+594)</option>
                            	<option value="689">French Polynesia (+689)</option>
                            	<option value="241">Gabon (+241)</option>
                            	<option value="220">Gambia (+220)</option>
                            	<option value="7880">Georgia (+7880)</option>
                            	<option value="49">Germany (+49)</option>
                            	<option value="233">Ghana (+233)</option>
                            	<option value="350">Gibraltar (+350)</option>
                            	<option value="30">Greece (+30)</option>
                            	<option value="299">Greenland (+299)</option>
                            	<option value="1473">Grenada (+1473)</option>
                            	<option value="590">Guadeloupe (+590)</option>
                            	<option value="671">Guam (+671)</option>
                            	<option value="502">Guatemala (+502)</option>
                            	<option value="224">Guinea (+224)</option>
                            	<option value="245">Guinea - Bissau (+245)</option>
                            	<option value="592">Guyana (+592)</option>
                            	<option value="509">Haiti (+509)</option>
                            	<option value="504">Honduras (+504)</option>
                            	<option value="852">Hong Kong (+852)</option>
                            	<option value="36">Hungary (+36)</option>
                            	<option value="354">Iceland (+354)</option>
                            	<option value="91">India (+91)</option>
                            	<option value="62">Indonesia (+62)</option>
                            	<option value="98">Iran (+98)</option>
                            	<option value="964">Iraq (+964)</option>
                            	<option value="353">Ireland (+353)</option>
                            	<option value="972">Israel (+972)</option>
                            	<option value="39">Italy (+39)</option>
                            	<option value="1876">Jamaica (+1876)</option>
                            	<option value="81">Japan (+81)</option>
                            	<option value="962">Jordan (+962)</option>
                            	<option value="7">Kazakhstan (+7)</option>
                            	<option value="254">Kenya (+254)</option>
                            	<option value="686">Kiribati (+686)</option>
                            	<option value="850">Korea North (+850)</option>
                            	<option value="82">Korea South (+82)</option>
                            	<option value="965">Kuwait (+965)</option>
                            	<option value="996">Kyrgyzstan (+996)</option>
                            	<option value="856">Laos (+856)</option>
                            	<option value="371">Latvia (+371)</option>
                            	<option value="961">Lebanon (+961)</option>
                            	<option value="266">Lesotho (+266)</option>
                            	<option value="231">Liberia (+231)</option>
                            	<option value="218">Libya (+218)</option>
                            	<option value="417">Liechtenstein (+417)</option>
                            	<option value="370">Lithuania (+370)</option>
                            	<option value="352">Luxembourg (+352)</option>
                            	<option value="853">Macao (+853)</option>
                            	<option value="389">Macedonia (+389)</option>
                            	<option value="261">Madagascar (+261)</option>
                            	<option value="265">Malawi (+265)</option>
                            	<option value="60">Malaysia (+60)</option>
                            	<option value="960">Maldives (+960)</option>
                            	<option value="223">Mali (+223)</option>
                            	<option value="356">Malta (+356)</option>
                            	<option value="692">Marshall Islands (+692)</option>
                            	<option value="596">Martinique (+596)</option>
                            	<option value="222">Mauritania (+222)</option>
                            	<option value="269">Mayotte (+269)</option>
                            	<option value="52">Mexico (+52)</option>
                            	<option value="691">Micronesia (+691)</option>
                            	<option value="373">Moldova (+373)</option>
                            	<option value="377">Monaco (+377)</option>
                            	<option value="976">Mongolia (+976)</option>
                            	<option value="1664">Montserrat (+1664)</option>
                            	<option value="212">Morocco (+212)</option>
                            	<option value="258">Mozambique (+258)</option>
                            	<option value="95">Myanmar (+95)</option>
                            	<option value="264">Namibia (+264)</option>
                            	<option value="674">Nauru (+674)</option>
                            	<option value="977">Nepal (+977)</option>
                            	<option value="31">Netherlands (+31)</option>
                            	<option value="687">New Caledonia (+687)</option>
                            	<option value="64">New Zealand (+64)</option>
                            	<option value="505">Nicaragua (+505)</option>
                            	<option value="227">Niger (+227)</option>
                            	<option value="234">Nigeria (+234)</option>
                            	<option value="683">Niue (+683)</option>
                            	<option value="672">Norfolk Islands (+672)</option>
                            	<option value="670">Northern Marianas (+670)</option>
                            	<option value="47">Norway (+47)</option>
                            	<option value="968">Oman (+968)</option>
                            	<option value="680">Palau (+680)</option>
                            	<option value="507">Panama (+507)</option>
                            	<option value="675">Papua New Guinea (+675)</option>
                            	<option value="595">Paraguay (+595)</option>
                            	<option value="51">Peru (+51)</option>
                            	<option value="63">Philippines (+63)</option>
                            	<option value="48">Poland (+48)</option>
                            	<option value="351">Portugal (+351)</option>
                            	<option value="1787">Puerto Rico (+1787)</option>
                            	<option value="974">Qatar (+974)</option>
                            	<option value="262">Reunion (+262)</option>
                            	<option value="40">Romania (+40)</option>
                            	<option value="7">Russia (+7)</option>
                            	<option value="250">Rwanda (+250)</option>
                            	<option value="378">San Marino (+378)</option>
                            	<option value="239">Sao Tome &amp; Principe (+239)</option>
                            	<option value="966">Saudi Arabia (+966)</option>
                            	<option value="221">Senegal (+221)</option>
                            	<option value="381">Serbia (+381)</option>
                            	<option value="248">Seychelles (+248)</option>
                            	<option value="232">Sierra Leone (+232)</option>
                            	<option value="65">Singapore (+65)</option>
                            	<option value="421">Slovak Republic (+421)</option>
                            	<option value="386">Slovenia (+386)</option>
                            	<option value="677">Solomon Islands (+677)</option>
                            	<option value="252">Somalia (+252)</option>
                            	<option value="27">South Africa (+27)</option>
                            	<option value="34">Spain (+34)</option>
                            	<option value="94">Sri Lanka (+94)</option>
                            	<option value="290">St. Helena (+290)</option>
                            	<option value="1869">St. Kitts (+1869)</option>
                            	<option value="1758">St. Lucia (+1758)</option>
                            	<option value="249">Sudan (+249)</option>
                            	<option value="597">Suriname (+597)</option>
                            	<option value="268">Swaziland (+268)</option>
                            	<option value="46">Sweden (+46)</option>
                            	<option value="41">Switzerland (+41)</option>
                            	<option value="963">Syria (+963)</option>
                            	<option value="886">Taiwan (+886)</option>
                            	<option value="7">Tajikstan (+7)</option>
                            	<option value="66">Thailand (+66)</option>
                            	<option value="228">Togo (+228)</option>
                            	<option value="676">Tonga (+676)</option>
                            	<option value="1868">Trinidad &amp; Tobago (+1868)</option>
                            	<option value="216">Tunisia (+216)</option>
                            	<option value="90">Turkey (+90)</option>
                            	<option value="7">Turkmenistan (+7)</option>
                            	<option value="993">Turkmenistan (+993)</option>
                            	<option value="1649">Turks &amp; Caicos Islands (+1649)</option>
                            	<option value="688">Tuvalu (+688)</option>
                            	<option value="256">Uganda (+256)</option>
                            	{/* <!-- <option data-countryCode="GB" value="44">UK (+44)</option> --> */}
                            	<option value="380">Ukraine (+380)</option>
                            	<option value="971">United Arab Emirates (+971)</option>
                            	<option value="598">Uruguay (+598)</option>
                            	{/* <!-- <option data-countryCode="US" value="1">USA (+1)</option> --> */}
                            	<option value="7">Uzbekistan (+7)</option>
                            	<option value="678">Vanuatu (+678)</option>
                            	<option value="379">Vatican City (+379)</option>
                            	<option value="58">Venezuela (+58)</option>
                            	<option value="84">Vietnam (+84)</option>
                            	<option value="84">Virgin Islands - British (+1284)</option>
                            	<option value="84">Virgin Islands - US (+1340)</option>
                            	<option value="681">Wallis &amp; Futuna (+681)</option>
                            	<option value="969">Yemen (North)(+969)</option>
                            	<option value="967">Yemen (South)(+967)</option>
                            	<option value="260">Zambia (+260)</option>
                            	<option value="263">Zimbabwe (+263)</option>
                            </optgroup>
                        </Input>

                        {formErrors.countryCode.length > 0 && (
                            <span className="errorMessage">{formErrors.countryCode}</span>
                        )}
                    </Col>
                    
                    <Col sm={6}>
                        <Input style={{width: '30%'}}
                            className={formErrors.mobilePhone.length > 0 ? "error" : null} 
                            name="mobilePhone" 
                            placeholder="Mobile Phone" 
                            value={this.state.mobilePhone} onChange={this.handleInputChange}/>

                        {formErrors.mobilePhone.length > 0 && (
                            <span className="errorMessage">{formErrors.mobilePhone}</span>
                        )}
                    </Col>

                </FormGroup><br />

                <FormGroup row>
                    <Label sm={2} style={{maxWidth: '12.5%'}}>Passport No : </Label>
                    <Col sm={10}>
                        <Input style={{width: '30%'}}
                            className={formErrors.passportNo.length > 0 ? "error" : null} 
                            name="passportNo" 
                            placeholder="Passport No" 
                            value={this.state.passportNo} onChange={this.handleInputChange}/>

                        {formErrors.passportNo.length > 0 && (
                            <span className="errorMessage">{formErrors.passportNo}</span>
                        )}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label sm={2} style={{maxWidth: '13.5%'}}>Expected Salary : </Label>
                    <Col sm={8}>
                        <Input style={{width: '30%'}}
                            className={formErrors.expectedSalary.length > 0 ? "error" : null} 
                            name="expectedSalary" 
                            placeholder="Expected Salary" 
                            value={this.state.expectedSalary} onChange={this.handleInputChange}/>

                        {formErrors.expectedSalary.length > 0 && (
                            <span className="errorMessage">{formErrors.expectedSalary}</span>
                        )}
                    </Col>
                    <Button type="submit">Submit</Button>
                </FormGroup>
                
            </Form>
        )
    }
}
const mapStateToProps = state => {
    return {
        list : state.list,
        currentIndex: state.currentIndex
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDataForm);
