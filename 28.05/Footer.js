import React from 'react';
import {MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';

function Footer() {
    return (
        <div className='footer'>
            <MDBFooter style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>

                <section className='' >
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{marginTop: 10}}>
                                    <MDBIcon color='secondary' icon='gem' className='me-3' />
                                    FLOG
                                </h6>
                                <hr style={{ backgroundColor: '#0D6936', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />

                                <p>
                                    Friendly Local Offers and Goods
                                </p>
                                <p>
                                    Сайт с объявлениями для кампуса НГУ
                                </p>
                            </MDBCol>

                            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>

                                <h6 className='text-uppercase fw-bold mb-4' style={{marginTop: 10}}>Информация</h6>
                                <hr style={{ backgroundColor: '#0D6936', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />
                                <p>
                                    <a href='https://docs.google.com/document/d/1YdM55V8laosMPVuYCj7m6pbdTpJHGXLABty5yw8OeV8/edit?usp=sharing' className='text-reset' target='_blank' rel='noopener noreferrer'>
                                        Наши правила
                                    </a>
                                </p>
                                <p>
                                    <a href='https://docs.google.com/document/d/1xi7k66AcMN9oVj1nVFnAiSUup-60flwg6wCnRmcSzXM/edit?usp=sharing' className='text-reset' target='_blank' rel='noopener noreferrer'>
                                        О сайте
                                    </a>
                                </p>

                            </MDBCol>

                            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{marginTop: 10}}>Связаться с нами</h6>
                                <hr style={{ backgroundColor: '#0D6936', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />

                                <p>
                                    a.ramazanova1@g.nsu.ru
                                </p>
                                <p>
                                    v.khlebnikov@g.nsu.ru
                                </p>
                                <p>
                                    d.plodushcheva@g.nsu.ru
                                </p>
                                <p>
                                    v.lomakin1@g.nsu.ru
                                </p>
                            </MDBCol>
                            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{marginTop: 10}}>О нас</h6>
                                <hr style={{ backgroundColor: '#0D6936', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />

                                <p>
                                    Новосибирск, НГУ
                                </p>
                                <p>
                                    ФИТ, группа 21215
                                </p>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2023
                </div>
            </MDBFooter>
        </div>

    );
}

export default Footer;