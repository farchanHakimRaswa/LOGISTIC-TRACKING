FROM mongo
COPY ./docker-entrypoint.sh /
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
USER mongodb
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["start"]