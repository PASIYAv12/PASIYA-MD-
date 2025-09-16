FROM PASIYA-MD

RUN git clone https://github.com/PASIYAv12/PASIYA-MD-.git
WORKDIR $PASIYA-MD

ENTRYPOINT ["bash","PASIYA-MD-whatsapp-start.sh"]
